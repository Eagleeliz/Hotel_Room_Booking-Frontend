// features/hotels/Hotels.tsx
import React from 'react';
import { useGetHotelsQuery } from '../features/api/HotelApi';
import HotelCard from '../hotels/HotelCard';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Hotels: React.FC = () => {
  const { data, error, isLoading } = useGetHotelsQuery();

  // Optional frontend fallback image
  const fallbackImage =
    'https://images.pexels.com/photos/1458457/pexels-photo-1458457.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&dpr=1';

  if (isLoading) {
    return <div className="p-6 text-gray-600">Loading hotels...</div>;
  }

  if (error) {
    return <div className="p-6 text-red-600">Error fetching hotels 😢</div>;
  }
  if (!data || data.hotels.length === 0) {
    return <div className="p-6">No hotels found.</div>;
  }

  return (
    <>
    <Navbar/>
  <section className="mt-0 w-screen min-h-screen flex items-center justify-center bg-pink-50 px-4">
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {data.hotels.map((hotel) => (
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
  </section>
  <Footer/>
  </>
);

};

export default Hotels;
