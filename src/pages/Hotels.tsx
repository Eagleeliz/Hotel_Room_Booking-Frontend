import React, { useState } from 'react';
import { useGetHotelsQuery } from '../features/api/HotelApi';
import HotelCard from '../hotels/HotelCard';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Hotels: React.FC = () => {
  const { data, error, isLoading } = useGetHotelsQuery();
  const [locationQuery, setLocationQuery] = useState('');
  const [nameQuery, setNameQuery] = useState('');

  const fallbackImage =
    'https://images.pexels.com/photos/1458457/pexels-photo-1458457.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&dpr=1';

  const getFilteredHotels = () => {
    if (!data?.hotels) return [];
    return data.hotels.filter((hotel) => {
      const matchName =
        nameQuery.trim() === '' ||
        hotel.name.toLowerCase().includes(nameQuery.toLowerCase().trim());
      const matchLocation =
        locationQuery.trim() === '' ||
        hotel.location.toLowerCase().includes(locationQuery.toLowerCase().trim());
      return matchName && matchLocation;
    });
  };

  const hotelsToDisplay = getFilteredHotels();

  if (isLoading) {
    return <div className="p-4 text-gray-600">Loading hotels...</div>;
  }

  if (error) {
    return <div className="p-4 text-red-600">Error fetching hotels 😢</div>;
  }

  return (
    <>
      <Navbar />

      {/* 🔍 Search Section */}
      <section className="w-screen bg-pink-50 px-4 pb-2 pt-4">

       <div className="max-w-[1000px] mx-auto w-full bg-white p-4 rounded-md shadow-sm flex flex-col md:flex-row items-center justify-between gap-2">
          <input
            type="text"
            placeholder="Search by Name"
            value={nameQuery}
            onChange={(e) => setNameQuery(e.target.value)}
            className="px-3 py-1.5 rounded-md border border-pink-300 focus:outline-none focus:ring-1 focus:ring-[#E9897E] bg-pink-50 text-gray-800 placeholder-gray-400 shadow w-56 text-sm"
          />
          <input
            type="text"
            placeholder="Search by Location"
            value={locationQuery}
            onChange={(e) => setLocationQuery(e.target.value)}
            className="px-3 py-1.5 rounded-md border border-pink-300 focus:outline-none focus:ring-1 focus:ring-[#E9897E] bg-pink-50 text-gray-800 placeholder-gray-400 shadow w-56 text-sm"
          />
        </div>
      </section>

      {/* 🏨 Hotels Grid */}
      <section className="w-full bg-pink-50 px-4 pt-2 pb-5">

        {hotelsToDisplay.length === 0 ? (
          <div className="p-4 text-gray-600 text-center">No hotels found.</div>
        ) : (
       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-12 max-w-7xl mx-auto px-4">
  {hotelsToDisplay.map((hotel) => (
    <div key={hotel.hotelId} className="flex justify-center">
      <HotelCard
        hotelId={hotel.hotelId}
        name={hotel.name}
        hotelImg={hotel.hotelImg || fallbackImage}
        location={hotel.location}
        rating={hotel.rating}
        category={hotel.category}
        address={hotel.address}
      />
    </div>
  ))}
</div>

        )}
      </section>

      <Footer />
    </>
  );
};

export default Hotels;
