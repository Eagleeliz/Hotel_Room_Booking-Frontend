import React, { useState } from "react";
import {
  useGetRoomsByHotelIdQuery,
  useCreateRoomMutation,
  useUpdateRoomMutation,
  useDeleteRoomMutation,
} from "../../features/api/RoomApi";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

interface RoomsManagerProps {
  hotelId: number;
}

const RoomsManager: React.FC<RoomsManagerProps> = ({ hotelId }) => {
  const navigate = useNavigate();
  const { data: rooms, refetch } = useGetRoomsByHotelIdQuery(hotelId);
  const [createRoom] = useCreateRoomMutation();
  const [updateRoom] = useUpdateRoomMutation();
  const [deleteRoom] = useDeleteRoomMutation();

  const [formData, setFormData] = useState({
    roomType: "",
    pricePerNight: "",
    capacity: 1,
    amenities: "",
    isAvailable: true,
    roomImg: "",
  });

  const [editingRoomId, setEditingRoomId] = useState<number | null>(null);
  const [showModal, setShowModal] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.roomType || !formData.pricePerNight || !formData.capacity || !formData.amenities) {
      MySwal.fire("Validation Error", "Please fill in all required fields", "warning");
      return;
    }

    try {
      const sanitizedFormData = {
        ...formData,
        pricePerNight: Number(formData.pricePerNight),
        capacity: Number(formData.capacity),
      };

      if (editingRoomId) {
        await updateRoom({ id: editingRoomId, hotelId, ...sanitizedFormData }).unwrap();
        MySwal.fire("Updated!", "Room updated successfully", "success");
      } else {
        await createRoom({ hotelId, ...sanitizedFormData }).unwrap();
        await MySwal.fire("Created!", "Room created successfully", "success");
      }

      refetch();
      setFormData({
        roomType: "",
        pricePerNight: "",
        capacity: 1,
        amenities: "",
        isAvailable: true,
        roomImg: "",
      });
      setEditingRoomId(null);
      setShowModal(false);
    } catch (error: any) {
      console.error(error);
      MySwal.fire("Error", error?.data?.error || "Something went wrong", "error");
    }
  };

  const handleEdit = (room: any) => {
    setFormData({
      roomType: room.roomType,
      pricePerNight: room.pricePerNight,
      capacity: room.capacity,
      amenities: room.amenities,
      isAvailable: room.isAvailable,
      roomImg: room.roomImg || "",
    });
    setEditingRoomId(room.roomId);
    setShowModal(true);
  };

  const handleDelete = async (roomId: number) => {
    const result = await MySwal.fire({
      title: "Delete Room",
      text: "Are you sure you want to delete this room?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        await deleteRoom(roomId).unwrap();
        MySwal.fire("Deleted!", "Room deleted successfully", "success");
        refetch();
      } catch (error) {
        console.error(error);
        MySwal.fire("Error", "Could not delete room", "error");
      }
    }
  };

  return (
    <div className="p-4 pt-4">
      {/* ✅ Both buttons in one row */}
      <div className="flex justify-between items-center mb-6">
        <button
          onClick={() => navigate("/admindashboard/hotels")}
          className="bg-gradient-to-r from-pink-500 to-red-500 text-white px-4 py-2 rounded"
        >
          ← Back to Hotels
        </button>
        <button
          onClick={() => {
            setEditingRoomId(null);
            setFormData({
              roomType: "",
              pricePerNight: "",
              capacity: 1,
              amenities: "",
              isAvailable: true,
              roomImg: "",
            });
            setShowModal(true);
          }}
          className="bg-gradient-to-r from-pink-500 to-red-500 text-white px-4 py-2 rounded"
        >
          + Add Room
        </button>
      </div>

      {rooms?.length === 0 && (
        <div className="border p-6 text-center rounded shadow text-gray-600">
          No rooms in this hotel.
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {rooms?.map((room) => (
          <div key={room.roomId} className="bg-white p-5 rounded-xl shadow-md border border-gray-200">
            <img
              src={room.roomImg || "/placeholder.jpg"}
              alt={room.roomType}
              className="w-full h-40 object-cover rounded-lg mb-4"
            />
            <div className="space-y-1 text-sm text-gray-700">
              <p><span className="font-semibold">Type:</span> {room.roomType}</p>
              <p><span className="font-semibold">Price:</span> {room.pricePerNight}</p>
              <p><span className="font-semibold">Capacity:</span> {room.capacity}</p>
              <p><span className="font-semibold">Amenities:</span> {room.amenities}</p>
              <p><span className="font-semibold">Available:</span> {room.isAvailable ? "Yes" : "No"}</p>
            </div>
            <div className="flex justify-between mt-4 gap-2">
              <button
                onClick={() => handleEdit(room)}
                className="bg-gradient-to-r from-pink-500 to-red-500 text-white font-medium text-sm"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(room.roomId)}
                className="bg-gradient-to-r from-red-500 to-red-500 text-white font-medium text-sm"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-2xl">
            <h2 className="text-xl font-bold mb-4">
              {editingRoomId ? "Edit Room" : "Add Room"}
            </h2>
            <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
              <input
                type="text"
                name="roomType"
                placeholder="Room Type"
                value={formData.roomType}
                onChange={handleChange}
                className="border p-2 rounded"
                required
              />
              <input
                type="text"
                name="pricePerNight"
                placeholder="Price Per Night"
                value={formData.pricePerNight}
                onChange={handleChange}
                className="border p-2 rounded"
                required
              />
              <input
                type="number"
                name="capacity"
                placeholder="Capacity"
                value={formData.capacity}
                onChange={handleChange}
                className="border p-2 rounded"
                required
              />
              <input
                type="text"
                name="amenities"
                placeholder="Amenities"
                value={formData.amenities}
                onChange={handleChange}
                className="border p-2 rounded"
                required
              />
              <input
                type="text"
                name="roomImg"
                placeholder="Image URL"
                value={formData.roomImg}
                onChange={handleChange}
                className="border p-2 rounded col-span-2"
              />
              <label className="col-span-2 flex items-center space-x-2">
                <input
                  type="checkbox"
                  name="isAvailable"
                  checked={formData.isAvailable}
                  onChange={handleChange}
                />
                <span>Available</span>
              </label>
              <div className="col-span-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="bg-gradient-to-r from-pink-500 to-red-500 text-white text-white px-4 py-2 rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-gradient-to-r from-red-500 to-red-500 text-white text-white px-4 py-2 rounded"
                >
                  {editingRoomId ? "Update Room" : "Create Room"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default RoomsManager;
