// components/HotelTeaser.tsx
import React from 'react';
import { useGetHotelsQuery } from '../features/api/HotelApi';
import HotelCard from '../hotels/HotelCard';
import { Link } from 'react-router-dom';

const HotelTeaser: React.FC = () => {
  const { data } = useGetHotelsQuery();

  const fallbackImage =
    'https://images.pexels.com/photos/1458457/pexels-photo-1458457.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&dpr=1';

  const topThreeHotels = data?.hotels?.slice(0, 3) || [];

  return (
    <section className="bg-rose-50 py-16 px-6 text-center text-gray-800">
      <h2 className="text-3xl md:text-4xl font-bold text-pink-500 mb-6">
        Discover Our Hotels
      </h2>
      <p className="text-lg mb-10 max-w-3xl mx-auto text-gray-600">
        Explore the World With Golden Home Hotels.Where will you go?
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {topThreeHotels.map((hotel) => (
          <HotelCard
            key={hotel.hotelId}
             hotelId={hotel.hotelId}
            name={hotel.name}
            hotelImg={hotel.hotelImg || fallbackImage}
            location={hotel.location}
            rating={hotel.rating}
            category={hotel.category}
            address={hotel.address}
          />
        ))}
      </div>

      <div className="mt-10">
        <Link
          to="/hotels"
          className="inline-block bg-gradient-to-r from-rose-500 via-pink-500 to-red-500 text-white font-semibold px-6 py-3 rounded-full hover:from-pink-400 hover:to-red-400 transition-all shadow-md"
        >
          Discover More
        </Link>
      </div>
    </section>
  );
};

export default HotelTeaser;
