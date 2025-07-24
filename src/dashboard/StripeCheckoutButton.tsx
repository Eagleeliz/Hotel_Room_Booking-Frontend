import React, { useState } from 'react';
import { Loader2, CheckCircle2, AlertTriangle } from 'lucide-react';
import axios from 'axios';

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

  const handleCheckout = async () => {
    setLoading(true);
    setError('');

    try {
      // ✅ Step 1: Create the booking directly as "Confirmed"
      const bookingResponse = await axios.post('http://localhost:5000/api/booking', {
        roomId,
        userId,
        checkInDate,
        checkOutDate,
        amount,
        status: 'Confirmed', // 👈 ensure it's directly marked as confirmed
      });

      const booking = bookingResponse.data;

      // ✅ Step 2: Initiate Stripe checkout session
      const stripeResponse = await axios.post(
        'http://localhost:5000/api/payments/create-checkout-session',
        {
          bookingId: booking.id,
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
    <div className={`w-full max-w-xs ${className}`}>
      {error && (
        <div className="text-red-600 text-sm flex items-center gap-2 mb-2">
          <AlertTriangle className="w-4 h-4" /> {error}
        </div>
      )}

      <button
        onClick={handleCheckout}
        disabled={loading}
        className={`w-full flex justify-center items-center gap-2 px-4 py-2 rounded-lg text-white text-sm font-semibold transition-all
          ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-purple-600 hover:bg-purple-700'}`}
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
