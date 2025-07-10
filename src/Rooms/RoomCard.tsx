// components/RoomCard.tsx
import React from "react";

interface RoomCardProps {
  roomType: string;
  pricePerNight: number;
  capacity: number;
  amenities: string;
  roomImg?: string;
}

const fallbackImg = "https://images.unsplash.com/photo-1496417263034-38ec4f0b665a?q=80&w=1471&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

const RoomCard: React.FC<RoomCardProps> = ({
  roomType,
  pricePerNight,
  capacity,
  amenities,
  roomImg,
}) => {
  return (
    <div className="w-full h-48 bg-pink-50 rounded-t-xl overflow-hidden flex items-center justify-center">
      <img
        src={roomImg || fallbackImg}
        alt={roomType}
        onError={(e) => (e.currentTarget.src = fallbackImg)}
        className="w-full h-48 object-cover transition-transform duration-300 hover:scale-105"
      />
      <div className="p-4">
        <h3 className="text-xl font-semibold text-gray-800">{roomType}</h3>
        <p className="text-sm text-gray-500 italic">👥 Capacity: {capacity}</p>
        <p className="text-sm text-gray-500 mb-1">🛎️ Amenities: {amenities}</p>
        <p className="mt-2 inline-block bg-green-100 text-pink-500 px-3 py-1 text-sm rounded-full">KES {pricePerNight} / night</p>
        <button className="mt-4 bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 text-white font-semibold px-5 py-2 rounded-full hover:scale-105 transition-all duration-300">
  Book Now
</button>
      </div>
    </div>
  );
};

export default RoomCard;
