// ✅ Added useRef for calendar icon functionality
import React, { useState, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import { useGetRoomsByHotelIdQuery } from "../features/api/RoomApi";
import { useGetHotelByIdQuery } from "../features/api/HotelApi";
import RoomCard from "../Rooms/RoomCard";
import axios from "axios";
import { FaCalendarAlt } from "react-icons/fa"; // ✅ Added calendar icon

const RoomsPage: React.FC = () => {
  const { hotelId } = useParams<{ hotelId: string }>();
  const [checkInDate, setCheckInDate] = useState("");
  const [checkOutDate, setCheckOutDate] = useState("");
  const [bookedRoomIds, setBookedRoomIds] = useState<number[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // ✅ Used to trigger native date picker when icon is clicked
  const checkInRef = useRef<HTMLInputElement>(null);
  const checkOutRef = useRef<HTMLInputElement>(null);

  // ✅ Restrict past dates by setting today's date
  const today = new Date().toISOString().split("T")[0];

  const {
    data: rooms,
    isError: roomsError,
    error: roomsErrorData,
  } = useGetRoomsByHotelIdQuery(Number(hotelId));

  const {
    data: hotelDetails,
    isError: hotelQueryError,
    error: hotelErrorData,
  } = useGetHotelByIdQuery(Number(hotelId));

  const hotelName = hotelDetails?.hotel?.name ?? "this hotel";

  const handleCheckAvailability = async () => {
    if (!checkInDate || !checkOutDate) {
      setError("Please select both check-in and check-out dates");
      return;
    }

    setError("");
    setLoading(true);

    try {
      // ✅ Fetch bookings in the selected range
      const res = await axios.get(
        `http://localhost:5000/api/booking/search/date-range?startDate=${checkInDate}&endDate=${checkOutDate}`
      );
      const data = res.data;
      const ids = data.map((b: any) => b.room?.roomId); // ✅ Extract booked room IDs
      setBookedRoomIds(ids);
    } catch (e) {
      setError("Failed to check availability");
    } finally {
      setLoading(false);
    }
  };

  const isRoomAvailable = (roomId: number) => {
    return !bookedRoomIds.includes(roomId); // ✅ Only show rooms not booked
  };

  if (roomsError || hotelQueryError) {
    const activeError = roomsErrorData ?? hotelErrorData;
    const errMessage =
      activeError && typeof activeError === "object" && "data" in activeError
        ? (activeError as any).data?.message ?? "Unknown error"
        : "Unknown error";

    return (
      <div className="text-red-600 p-10">
        <p>{errMessage}</p>
        <Link to="/hotels" className="text-blue-600 underline">
          ← Back to Hotels
        </Link>
      </div>
    );
  }

  return (
    <section className="w-screen min-h-screen bg-pink-50 px-6 py-12 flex flex-col items-center">
      <h1 className="text-xl font-bold text-pink-500 mb-4">Welcome to {hotelName}</h1>

      <Link
        to="/hotels"
        className="mb-4 inline-block bg-pink-500 text-white font-semibold px-6 py-2 rounded-full"
      >
        ← Back to Hotels
      </Link>

      {/* ✅ Check Availability section with icons and validation */}
      <div className="flex gap-6 items-end flex-wrap justify-center bg-white p-6 rounded-xl shadow mb-10">
        {/* ✅ Check-in field */}
        <div className="flex flex-col relative">
          <label className="text-sm font-medium text-gray-700 mb-1">Check-in Date</label>
          <input
            ref={checkInRef}
            type="date"
            value={checkInDate}
            onChange={(e) => {
              setCheckInDate(e.target.value);
              if (checkOutDate && e.target.value >= checkOutDate) {
                setCheckOutDate(""); // ✅ Reset check-out if it's earlier than check-in
              }
            }}
            min={today} // ✅ Prevent selecting past dates
            className="border border-gray-300 px-4 py-2 rounded-md text-gray-800 pr-10"
          />
          <FaCalendarAlt
            className="absolute right-3 top-9 text-gray-500 cursor-pointer"
            onClick={() => checkInRef.current?.showPicker()}
          />
        </div>

        {/* ✅ Check-out field */}
        <div className="flex flex-col relative">
          <label className="text-sm font-medium text-gray-700 mb-1">Check-out Date</label>
          <input
            ref={checkOutRef}
            type="date"
            value={checkOutDate}
            onChange={(e) => setCheckOutDate(e.target.value)}
            min={checkInDate || today} // ✅ Prevent selecting check-out before check-in
            className="border border-gray-300 px-4 py-2 rounded-md text-gray-800 pr-10"
          />
          <FaCalendarAlt
            className="absolute right-3 top-9 text-gray-500 cursor-pointer"
            onClick={() => checkOutRef.current?.showPicker()}
          />
        </div>

        {/* ✅ Check button */}
        <button
          onClick={handleCheckAvailability}
          className="bg-gradient-to-r from-pink-500 to-red-500 text-white px-6 py-2 rounded-full hover:scale-105 transition"
        >
          {loading ? "Checking..." : "Check Availability"}
        </button>
      </div>

      {/* ✅ Error message */}
      {error && <p className="text-red-500">{error}</p>}

      {/* ✅ Filtered Room List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 w-full max-w-7xl">
        {rooms
          ?.filter((room) => isRoomAvailable(room.roomId))
          .map((room) => (
            <RoomCard
              key={room.roomId}
              {...room}
              checkInDate={checkInDate}
              checkOutDate={checkOutDate}
            />
          ))}
      </div>
    </section>
  );
};

export default RoomsPage;
