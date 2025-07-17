// components/RoomCard.tsx
import React from "react";

interface RoomCardProps {
  roomId: number;
  roomType: string;
  pricePerNight: number;
  capacity: number;
  amenities: string;
  roomImg?: string;
  checkInDate?: string;
  checkOutDate?: string;
}

const fallbackImg =
  "https://images.unsplash.com/photo-1496417263034-38ec4f0b665a?q=80&w=1471&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

const RoomCard: React.FC<RoomCardProps> = ({
  roomId,
  roomType,
  pricePerNight,
  capacity,
  amenities,
  roomImg,
  checkInDate,
  checkOutDate,
}) => {
  const handleBookNow = () => {
    if (!checkInDate || !checkOutDate) {
      alert("Please select check-in and check-out dates before booking.");
      return;
    }

    // Example action (you can replace with modal or navigation to booking page)
    alert(
      `Booking Room ID: ${roomId}\nCheck-in: ${checkInDate}\nCheck-out: ${checkOutDate}`
    );

    // ✅ You can later redirect to booking page:
    // navigate(`/book/${roomId}?checkIn=${checkInDate}&checkOut=${checkOutDate}`)
  };

  return (
    <div className="flex bg-white rounded-xl shadow-md overflow-hidden 
    w-full max-w-[800px] h-[440px] transition-all duration-300 
    hover:shadow-pink-500/50 
    hover:shadow-2xl hover:scale-[1.02] mx-auto">
      <img
        src={roomImg || fallbackImg}
        alt={`Image of ${roomType}`}
        onError={(e) => (e.currentTarget.src = fallbackImg)}
        className="w-1/2 object-cover h-full"
      />
      <div className="w-1/2 p-6 flex flex-col items-center justify-center text-center">
        <h3 className="text-2xl font-serif text-[#1f2a44] font-bold whitespace-nowrap">{roomType}</h3>
        <p className="text-sm text-gray-500 mt-2">👥 Capacity: {capacity}</p>
        <ul className="text-sm text-gray-500 list-disc list-inside mt-2 mb-3">
          {amenities.split(",").map((item, index) => (
            <li key={index}>{item.trim()}</li>
          ))}
        </ul>
        <p className="text-pink-500 font-semibold text-lg whitespace-nowrap">
          KES {pricePerNight} /night
        </p>
        <button
          onClick={handleBookNow}
          className="mt-4 bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 text-white font-bold px-5 py-2 rounded-full hover:scale-105 transition-all duration-300"
        >
          Book Now
        </button>
      </div>
    </div>
  );
};

export default RoomCard;
