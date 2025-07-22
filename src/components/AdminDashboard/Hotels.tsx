import React, { useState } from "react";
import {
  useGetHotelsQuery,
  useCreateHotelMutation,
  useUpdateHotelMutation,
  useDeleteHotelMutation,
} from "../../features/api/HotelApi";
import type { Hotel } from "../../types/Types";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

const Hotels = () => {
  const navigate = useNavigate(); // ✅ added for navigation
  const { data: hotels, isLoading, isError, refetch } = useGetHotelsQuery();
  const [createHotel] = useCreateHotelMutation();
  const [updateHotel] = useUpdateHotelMutation();
  const [deleteHotel] = useDeleteHotelMutation();

  const [formData, setFormData] = useState<Omit<Hotel, "hotelId" | "createdAt" | "updatedAt">>({
    name: "",
    location: "",
    address: "",
    contactPhone: "",
    category: "",
    rating: 0,
    hotelImg: "",
  });

  const [editingHotel, setEditingHotel] = useState<Hotel | null>(null);
  const [showModal, setShowModal] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const sanitizedFormData = {
        ...formData,
        rating: Number(formData.rating),
        hotelImg: formData.hotelImg ?? undefined,
        address: formData.address ?? undefined,
        contactPhone: formData.contactPhone ?? undefined,
        category: formData.category ?? undefined,
      };

      if (editingHotel && editingHotel.hotelId !== undefined) {
        await updateHotel({ hotelId: editingHotel.hotelId, ...sanitizedFormData }).unwrap();
        MySwal.fire("Updated!", "Hotel updated successfully", "success");
      } else {
        await createHotel(sanitizedFormData).unwrap();
        MySwal.fire("Created!", "Hotel created successfully", "success");
      }

      setFormData({
        name: "",
        location: "",
        address: "",
        contactPhone: "",
        category: "",
        rating: 0,
        hotelImg: "",
      });
      setEditingHotel(null);
      setShowModal(false);
      refetch();
    } catch (error: any) {
      console.error("Error saving hotel:", error);
      MySwal.fire("Error", error?.data?.message || "Something went wrong", "error");
    }
  };

  const handleEdit = (hotel: Hotel) => {
    setEditingHotel(hotel);
    setFormData({
      name: hotel.name,
      location: hotel.location,
      address: hotel.address ?? "",
      contactPhone: hotel.contactPhone ?? "",
      category: hotel.category ?? "",
      rating: hotel.rating ?? 0,
      hotelImg: hotel.hotelImg ?? "",
    });
    setShowModal(true);
  };

  const handleDelete = async (hotelId: number) => {
    const result = await MySwal.fire({
      title: "Are you sure?",
      text: "You won’t be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        await deleteHotel(hotelId).unwrap();
        MySwal.fire("Deleted!", "Hotel has been deleted.", "success");
        refetch();
      } catch (error) {
        console.error("Error deleting hotel:", error);
        MySwal.fire("Error", "Failed to delete hotel", "error");
      }
    }
  };

  if (isLoading) return <div>Loading hotels...</div>;
  if (isError) return <div>Error loading hotels</div>;

  return (
    <div className="p-4 pt-20">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Hotels ({hotels?.hotels?.length ?? 0})</h2>
        <button
          onClick={() => {
            setEditingHotel(null);
            setFormData({
              name: "",
              location: "",
              address: "",
              contactPhone: "",
              category: "",
              rating: 0,
              hotelImg: "",
            });
            setShowModal(true);
          }}
          className="bg-gradient-to-r from-pink-500 to-red-500  text-white px-4 py-2 rounded"
        >
          + Add Hotel
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {hotels?.hotels?.map((hotel: Hotel) => (
          <div
            key={hotel.hotelId}
            className="bg-white p-5 rounded-xl shadow-md border border-gray-200"
          >
            <img
              src={hotel.hotelImg ?? "/placeholder.jpg"}
              alt={hotel.name}
              className="w-full h-40 object-cover rounded-lg mb-4"
            />
            <div className="space-y-2 text-sm text-gray-700">
              <p><span className="font-semibold">Name:</span> {hotel.name}</p>
              <p><span className="font-semibold">Location:</span> {hotel.location}</p>
              <p><span className="font-semibold">Address:</span> {hotel.address ?? "N/A"}</p>
              <p><span className="font-semibold">Phone:</span> {hotel.contactPhone ?? "N/A"}</p>
              <p><span className="font-semibold">Category:</span> {hotel.category ?? "N/A"}</p>
              <p><span className="font-semibold">Rating:</span> {hotel.rating ?? "N/A"}</p>
            </div>
            <div className="flex justify-between mt-4 gap-2">
              <button onClick={() => handleEdit(hotel)}
               className="bg-gradient-to-r from-red-500 to-red-500 text-white font-medium text-sm">
                Edit
              </button>
              <button
                onClick={() => hotel.hotelId && handleDelete(hotel.hotelId)}
                className="bg-gradient-to-r from-pink-500 to-red-500 text-white font-medium text-sm"
              >
                Delete
              </button>
              <button
                onClick={() => navigate(`/admindashboard/hotels/${hotel.hotelId}/rooms`)} // ✅ navigate to new page
                className="bg-gradient-to-r from-pink-500 to-pink-500 text-white font-medium text-sm"
              >
                Rooms
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* MODAL */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-2xl">
            <h2 className="text-xl font-bold mb-4">
              {editingHotel ? "Edit Hotel" : "Add Hotel"}
            </h2>
            <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
              <input
                type="text"
                name="name"
                placeholder="Hotel Name"
                value={formData.name}
                onChange={handleChange}
                className="border p-2 rounded"
                required
              />
              <input
                type="text"
                name="location"
                placeholder="Location"
                value={formData.location}
                onChange={handleChange}
                className="border p-2 rounded"
                required
              />
              <input
                type="text"
                name="address"
                placeholder="Address"
                value={formData.address ?? ""}
                onChange={handleChange}
                className="border p-2 rounded"
              />
              <input
                type="text"
                name="contactPhone"
                placeholder="Contact Phone"
                value={formData.contactPhone ?? ""}
                onChange={handleChange}
                className="border p-2 rounded"
              />
              <input
                type="text"
                name="category"
                placeholder="Category"
                value={formData.category ?? ""}
                onChange={handleChange}
                className="border p-2 rounded"
              />
              <input
                type="number"
                name="rating"
                placeholder="Rating"
                value={formData.rating ?? 0}
                onChange={handleChange}
                className="border p-2 rounded"
              />
              <input
                type="text"
                name="hotelImg"
                placeholder="Image URL"
                value={formData.hotelImg ?? ""}
                onChange={handleChange}
                className="border p-2 rounded col-span-2"
              />
              <div className="col-span-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="bg-gradient-to-r from-pink-500 to-red-500 text-white px-4 py-2 rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-gradient-to-r from-red-500 to-red-500 text-white px-4 py-2 rounded"
                >
                  {editingHotel ? "Update Hotel" : "Create Hotel"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Hotels;
