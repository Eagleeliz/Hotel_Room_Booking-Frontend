import React from 'react';
import { MdLocationOn } from "react-icons/md";
import { Link } from 'react-router-dom';

interface HotelCardProps {
    
  hotelId: number;
  name: string;
  hotelImg: string;
  location: string;
  rating: number;
  category: string;
  address: string;
}

const fallbackImage =
  'https://images.pexels.com/photos/1458457/pexels-photo-1458457.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&dpr=1';

const HotelCard: React.FC<HotelCardProps> = ({
  hotelId,
  name,
  hotelImg,
  location,
  rating,
  category,
  address,
}) => {
  return (
    <div className="relative w-[22rem] h-[18rem] md:w-[24rem] md:h-[20rem] lg:w-[26rem] lg:h-[22rem] rounded-xl overflow-hidden group shadow-md hover:shadow-xl transition-shadow duration-300 hover:scale-[1.02]">
      
      {/* Hotel Image with subtle blur & darkening */}
      <img
        src={hotelImg}
        alt={name}
        onError={(e) => {
          e.currentTarget.src = fallbackImage;
        }}
        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105 group-hover:blur-[2px] group-hover:brightness-90"
      />

      {/* Rating Badge */}
      <div className="absolute top-4 right-4 bg-black/60 text-white text-sm font-semibold px-3 py-1 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-30">
        ⭐ {rating}
      </div>

      {/* Default Hotel Name */}
      <div className="absolute bottom-4 left-4 text-white text-lg font-semibold bg-black/50 px-3 py-1 rounded-lg transition-all duration-300 group-hover:opacity-0 z-10">
        {name}
      </div>

      {/* Hover Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/50 to-transparent text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20 flex flex-col justify-center text-center px-6 py-8 space-y-2">
        <h2 className="text-2xl font-extrabold tracking-wide">{name}</h2>

        <div className="flex justify-center items-center gap-2 text-lg text-white">
          <MdLocationOn className="text-blue-500 w-5 h-5" />
          <span>{location}</span>
        </div>

        <p className="text-lg">📍{address}</p>
        <p className="text-lg italic">{category}</p>

        {/* View Rooms Button */}
        <Link
          to={`/hotels/${hotelId}/rooms`}
          className="mt-4 inline-block bg-gradient-to-r from-rose-500 via-pink-500 to-red-500 text-white font-semibold px-6 py-2 rounded-full hover:from-rose-400 hover:to-pink-400 transition-all duration-300 shadow-md focus:outline-none focus:ring-2 focus:ring-pink-300"
        >
          View Rooms
        </Link>
      </div>
    </div>
  );
};

export default HotelCard;
