import React, { useEffect, useState } from 'react';
import {
  useGetMyProfileQuery,
  useUpdateMyProfileMutation,
} from '../features/api/userApi';

type ProfileFormData = {
  firstName: string;
  lastName: string;
  email: string;
  password?: string;
  contactPhone: string;
  address: string;
};

const MyProfile: React.FC = () => {
  //  const user = useSelector((state: RootState) => state.auth.user);
  //  console.log(user)
  const { data, isLoading, error } = useGetMyProfileQuery();
  console.log(data)
  const [updateProfile] = useUpdateMyProfileMutation();

  const [formData, setFormData] = useState<ProfileFormData>({
    firstName: '',
    lastName: '',
    email: '',
    contactPhone: '',
    address: '',
  });

  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    if (data) {
      setFormData({
        firstName: data.firstName || '',
        lastName: data.lastName || '',
        email: data.email || '',
        contactPhone: data.contactPhone || '',
        address: data.address || '',
      });
    }
  }, [data]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = { ...formData };
    if (!payload.password) delete payload.password;

    try {
      await updateProfile(payload).unwrap();
      alert('✅ Profile updated successfully');
      setShowForm(false);
    } catch (err) {
      console.error(err);
      alert('❌ Failed to update profile');
    }
  };

  if (isLoading) return <p className="text-center mt-10 text-gray-700">Loading profile...</p>;
  if (error) return <p className="text-center mt-10 text-red-500">Failed to load profile</p>;

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-gray-50 text-gray-800">
      {!showForm ? (
        <>
          <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">My Profile</h2>
          <div className="grid md:grid-cols-2 gap-6 bg-white p-6 rounded shadow">
            <div>
              <p><span className="font-semibold">First Name:</span> {formData.firstName}</p>
              <p><span className="font-semibold">Last Name:</span> {formData.lastName}</p>
              <p><span className="font-semibold">Email:</span> {formData.email}</p>
            </div>
            <div>
              <p><span className="font-semibold">Phone:</span> {formData.contactPhone}</p>
              <p><span className="font-semibold">Address:</span> {formData.address}</p>
            </div>
          </div>
          <button
            onClick={() => setShowForm(true)}
            className="mt-6 w-full md:w-auto bg-blue-600 text-white py-2 px-6 rounded hover:bg-blue-700"
          >
            Edit Profile
          </button>
        </>
      ) : (
        <>
          <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Edit Profile</h2>
          <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded shadow">
            <div>
              <label className="block text-sm font-medium text-gray-700">First Name</label>
              <input
                type="text"
                name="firstName"
                className="w-full border px-3 py-2 rounded text-gray-800"
                value={formData.firstName}
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Last Name</label>
              <input
                type="text"
                name="lastName"
                className="w-full border px-3 py-2 rounded text-gray-800"
                value={formData.lastName}
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                name="email"
                className="w-full border px-3 py-2 rounded bg-gray-100 text-gray-800"
                value={formData.email}
                onChange={handleChange}
                disabled
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">New Password (optional)</label>
              <input
                type="password"
                name="password"
                className="w-full border px-3 py-2 rounded text-gray-800"
                value={formData.password || ''}
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Phone</label>
              <input
                type="text"
                name="contactPhone"
                className="w-full border px-3 py-2 rounded text-gray-800"
                value={formData.contactPhone}
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Address</label>
              <textarea
                name="address"
                className="w-full border px-3 py-2 rounded text-gray-800"
                value={formData.address}
                onChange={handleChange}
              />
            </div>

            <div className="flex gap-4">
              <button
                type="submit"
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
              >
                Save Changes
              </button>
              <button
                type="button"
                className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
                onClick={() => setShowForm(false)}
              >
                Cancel
              </button>
            </div>
          </form>
        </>
      )}
    </div>
  );
};

export default MyProfile;
