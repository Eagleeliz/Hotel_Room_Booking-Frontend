import React, { useState } from 'react';
import { Loader2, CheckCircle2, AlertTriangle } from 'lucide-react';
import axios from 'axios';
import { useCreateBookingMutation } from "../features/api/BookingApi";

interface MyPaymentProps {
  roomId: number;
  userId: number;
  checkInDate: string;
  checkOutDate: string;
  amount: number;
  className?: string;
}

const StripeCheckoutButton: React.FC<MyPaymentProps> = ({
  roomId,
  userId,
  checkInDate,
  checkOutDate,
  amount,
  className,
}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [createBooking] = useCreateBookingMutation();

  const handleCheckout = async () => {
    setLoading(true);
    setError('');

    try {
      // ✅ Step 1: Create the booking directly as "Confirmed"
      const bookingResponse = await createBooking({
        roomId,
        userId,
        checkInDate,
        checkOutDate,
      }).unwrap();
      const booking = bookingResponse.booking;

      // ✅ Step 2: Initiate Stripe checkout session
      const stripeResponse = await axios.post(
        'http://localhost:5000/api/payments/create-checkout-session',
        {
          bookingId: booking?.bookingId,
          amount,
        }
      );

      if (stripeResponse.data.url) {
        window.location.href = stripeResponse.data.url;
      } else {
        setError('Unable to get Stripe checkout URL.');
      }
    } catch (err: any) {
      console.error(err);
      const msg =
        err.response?.data?.message ||
        err.message ||
        'Payment initiation failed. Try again.';
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`w-full ${className ?? ''}`}>
      {error && (
        <div className="text-red-600 text-sm flex items-center gap-2 mb-2">
          <AlertTriangle className="w-4 h-4" /> {error}
        </div>
      )}

      <button
        onClick={handleCheckout}
        disabled={loading}
        className={`w-full flex justify-center items-center gap-2 px-5 py-3 rounded-xl text-white text-sm font-semibold transition-all duration-300 ease-in-out
          ${loading 
            ? 'bg-gray-400 cursor-not-allowed' 
            : 'bg-gradient-to-r from-purple-600 via-pink-500 to-red-500 shadow-md hover:shadow-xl hover:scale-[1.02]'}`}
      >
        {loading ? (
          <>
            <Loader2 className="animate-spin w-4 h-4" /> Processing...
          </>
        ) : (
          <>
            <CheckCircle2 className="w-4 h-4" /> Pay Now
          </>
        )}
      </button>
    </div>
  );
};

export default StripeCheckoutButton;
