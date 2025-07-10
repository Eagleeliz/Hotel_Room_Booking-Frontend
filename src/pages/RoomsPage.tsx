import React from "react";
import { useParams, Link } from "react-router-dom";
import { useGetRoomsByHotelIdQuery } from "../features/api/RoomApi";
import { useGetHotelByIdQuery } from "../features/api/HotelApi";
import RoomCard from "../Rooms/RoomCard";

const RoomsPage: React.FC = () => {
  const { hotelId } = useParams<{ hotelId: string }>();

  const {
    data: rooms,
    isLoading: loadingRooms,
    isError: roomsError,
    error: roomsErrorData,
  } = useGetRoomsByHotelIdQuery(Number(hotelId));

  const {
    data: hotelDetails,
    isLoading: loadingHotel,
    isError: hotelQueryError,
    error: hotelErrorData,
  } = useGetHotelByIdQuery(Number(hotelId));

  const hotelName = hotelDetails?.hotel?.name ?? "this hotel";

  if (roomsError || hotelQueryError) {
    const activeError = roomsErrorData ?? hotelErrorData;
    const errMessage =
      activeError && "data" in activeError
        ? (activeError.data as { message?: string })?.message ?? "Unknown error"
        : "Unknown error";

    return (
      <section className="w-screen min-h-screen bg-pink-50 text-gray-800 px-6 py-20 overflow-x-hidden flex flex-col items-center justify-center text-center">
        <h1 className="text-4xl font-bold text-pink-500 mb-4">
          Welcome to {hotelName}
        </h1>
        <div className="text-red-600 space-y-2">
          <p>Error fetching data: {errMessage}</p>
          <Link
            to="/hotels"
            className="inline-block bg-pink-500 text-white font-semibold px-6 py-2 rounded-full mt-2 hover:bg-pink-600 transition duration-300 shadow-md"
          >
            ← Back to Hotels
          </Link>
        </div>
      </section>
    );
  }

  const hasRooms = rooms && rooms.length > 0;

  return (
    <section className="w-screen min-h-screen bg-pink-50 text-gray-800 px-6 py-20 overflow-x-hidden flex flex-col items-center">
      <h1 className="text-4xl md:text-5xl font-bold text-pink-400 text-center mb-6">
        Welcome to {hotelName}
      </h1>

      <Link
        to="/hotels"
        className="bg-pink-500 text-white font-semibold px-6 py-2 rounded-full mb-10 hover:bg-pink-400 transition-all duration-300 shadow-md"
      >
        ← Back to Hotels
      </Link>

      {hasRooms ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-7xl w-full">
          {rooms.map((room) => (
            <RoomCard key={room.roomId} {...room} />
          ))}
        </div>
      ) : (
        <div className="flex-grow flex flex-col justify-center items-center text-center text-gray-600 text-lg mt-12">
          <p>No rooms found for {hotelName} 🕰️</p>
        </div>
      )}
    </section>
  );
};

export default RoomsPage;
