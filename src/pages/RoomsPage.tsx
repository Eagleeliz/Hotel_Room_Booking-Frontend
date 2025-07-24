import React, { useState, useRef } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useGetRoomsByHotelIdQuery } from "../features/api/RoomApi";
import { useGetHotelByIdQuery } from "../features/api/HotelApi";
import RoomCard from "../Rooms/RoomCard";
import axios from "axios";
import { FaCalendarAlt } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import Swal from "sweetalert2";
import 'react-toastify/dist/ReactToastify.css';
import StripeCheckoutButton from "../dashboard/StripeCheckoutButton";

const RoomsPage: React.FC = () => {
  const { hotelId } = useParams<{ hotelId: string }>();
  const navigate = useNavigate();

  const [checkInDate, setCheckInDate] = useState("");
  const [checkOutDate, setCheckOutDate] = useState("");
  const [bookedRoomIds, setBookedRoomIds] = useState<number[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [hasCheckedAvailability, setHasCheckedAvailability] = useState(false);

  const [selectedRoom, setSelectedRoom] = useState<any>(null);
  const [showModal, setShowModal] = useState(false);

  const checkInRef = useRef<HTMLInputElement>(null);
  const checkOutRef = useRef<HTMLInputElement>(null);

  const today = new Date().toISOString().split("T")[0];

  const { data: rooms } = useGetRoomsByHotelIdQuery(Number(hotelId));
  const { data: hotelDetails } = useGetHotelByIdQuery(Number(hotelId));
  const hotelName = hotelDetails?.hotel?.name ?? "this hotel";

  const numberOfNights = checkInDate && checkOutDate
    ? Math.max(1, Math.ceil(
        (new Date(checkOutDate).getTime() - new Date(checkInDate).getTime()) / (1000 * 60 * 60 * 24)
      ))
    : 0;

  const handleCheckAvailability = async () => {
    if (!checkInDate || !checkOutDate) {
      setError("Please select both check-in and check-out dates");
      return;
    }

    setError("");
    setLoading(true);
    setHasCheckedAvailability(true);

    try {
      const res = await axios.get(
        `http://localhost:5000/api/booking/search/date-range?startDate=${checkInDate}&endDate=${checkOutDate}`
      );
      const data = res.data;
      const ids = data.map((b: any) => b.room?.roomId);
      setBookedRoomIds(ids);
      toast.success("The following rooms are available for the selected date");
    } catch {
      setError("Failed to check availability");
      toast.error("Failed to check availability");
    } finally {
      setLoading(false);
    }
  };

  const isRoomAvailable = (roomId: number) => {
    return !bookedRoomIds.includes(roomId);
  };

  const handleBook = (room: any) => {
    const isUserLoggedIn = !!localStorage.getItem("token");

    if (!isUserLoggedIn) {
      Swal.fire({
        icon: "warning",
        title: "Login Required",
        text: "You must be logged in to book a room.",
        confirmButtonText: "Login",
        showCancelButton: true,
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/login");
        }
      });
      return;
    }

    if (!checkInDate || !checkOutDate) {
      Swal.fire({
        icon: "info",
        title: "Missing Dates",
        text: "Please select check-in and check-out dates to continue.",
      });
      return;
    }

    if (!hasCheckedAvailability) {
      Swal.fire({
        icon: "info",
        title: "Check Availability",
        text: "Please check availability before booking.",
      });
      return;
    }

    setSelectedRoom(room);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedRoom(null);
  };

  const user = JSON.parse(localStorage.getItem("user") || "{}");
const userId = user?.userId;
console.log(user)


  return (
    <section className="w-screen min-h-screen bg-pink-50 px-6 py-12 flex flex-col items-center">
      <ToastContainer position="top-right" autoClose={3000} />
      <h1 className="text-xl font-bold text-pink-500 mb-4">
        Welcome to {hotelName}
      </h1>
      <Link to="/hotels" className="mb-4 inline-block bg-pink-500 text-white font-semibold px-6 py-2 rounded-full">
        ← Back to Hotels
      </Link>

      {/* Date Filters */}
      <div className="flex gap-6 items-end flex-wrap justify-center bg-white p-6 rounded-xl shadow mb-10">
        <div className="flex flex-col relative">
          <label className="text-sm font-medium text-gray-700 mb-1">Check-in Date</label>
                          <input
                ref={checkInRef}
                type="date"
                value={checkInDate}
                onChange={(e) => {
                  setCheckInDate(e.target.value);
                  if (checkOutDate && e.target.value >= checkOutDate) {
                    setCheckOutDate("");
                  }
                }} // ✅ fixed: closed the onChange function properly
                min={today}
                className="border border-gray-300 px-4 py-2 rounded-md text-gray-800 pr-10"
              />

          <FaCalendarAlt className="absolute right-3 top-9 text-gray-500 cursor-pointer" onClick={() => checkInRef.current?.showPicker()} />
        </div>

        <div className="flex flex-col relative">
          <label className="text-sm font-medium text-gray-700 mb-1">Check-out Date</label>
          <input
            ref={checkOutRef}
            type="date"
            value={checkOutDate}
            onChange={(e) => setCheckOutDate(e.target.value)}
            min={checkInDate || today}
            className="border border-gray-300 px-4 py-2 rounded-md text-gray-800 pr-10"
          />
          <FaCalendarAlt className="absolute right-3 top-9 text-gray-500 cursor-pointer" onClick={() => checkOutRef.current?.showPicker()} />
        </div>

        <button onClick={handleCheckAvailability} className="bg-gradient-to-r from-pink-500 to-red-500 text-white px-6 py-2 rounded-full hover:scale-105 transition">
          {loading ? "Checking..." : "Check Availability"}
        </button>
      </div>

      {error && <p className="text-red-500">{error}</p>}

      {/* Room Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 w-full max-w-7xl">
        {rooms?.map((room) => {
          const available = isRoomAvailable(room.roomId);
          if (hasCheckedAvailability && !available) return null;

          return (
            <RoomCard
              key={room.roomId}
              room={room}
              onBook={() => handleBook(room)}
            />
          );
        })}
      </div>

      {/* Booking Modal */}
      {showModal && selectedRoom && (
        <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black bg-opacity-40">
          <div className="relative bg-white text-black p-6 rounded-2xl shadow-2xl w-full max-w-md border border-gray-200">
            <button
              className="absolute top-3 right-4 text-gray-500 hover:text-red-500 text-xl"
              onClick={closeModal}
            >
              &times;
            </button>
            <h2 className="text-2xl font-semibold mb-4 text-center">Booking Summary</h2>

            <div className="space-y-2">
              <p><span className="font-medium">Room:</span> {selectedRoom.roomType ?? "N/A"}</p>
              <p><span className="font-medium">Hotel:</span> {hotelName}</p>
              <p><span className="font-medium">Check-in:</span> {checkInDate ?? "N/A"}</p>
              <p><span className="font-medium">Check-out:</span> {checkOutDate ?? "N/A"}</p>
              <p><span className="font-medium">Price per night:</span> ${selectedRoom.pricePerNight ?? 0}</p>
              <p><span className="font-medium">Number of nights:</span> {numberOfNights}</p>
              <p className="font-semibold text-lg mt-2">
                <span className="font-medium">Total:</span> $
                {(selectedRoom.pricePerNight * numberOfNights).toFixed(2)}
              </p>
            </div>

            <div className="mt-6">
              <StripeCheckoutButton
                roomId={selectedRoom.roomId}
                userId={userId}
                checkInDate={checkInDate}
                checkOutDate={checkOutDate}
                amount={selectedRoom.pricePerNight * numberOfNights}
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default RoomsPage;