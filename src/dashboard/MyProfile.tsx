import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import {
  useGetMyProfileQuery,
  useUpdateMyProfileMutation,
} from '../features/api/userApi';

interface ProfileFormData {
  firstName: string;
  lastName: string;
  email: string;
  password?: string;
  contactPhone: string;
  address: string;
  profileImage?: string;
}

const MyProfile: React.FC = () => {
  const { data, isLoading, error } = useGetMyProfileQuery();
  const [updateProfile] = useUpdateMyProfileMutation();

  const [formData, setFormData] = useState<ProfileFormData>({
    firstName: '',
    lastName: '',
    email: '',
    contactPhone: '',
    address: '',
    profileImage: '',
  });

  const [showForm, setShowForm] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  useEffect(() => {
    if (data) {
      setFormData((prev) => ({
        firstName: data.firstName || '',
        lastName: data.lastName || '',
        email: data.email || '',
        contactPhone: data.contactPhone || '',
        address: data.address || '',
        profileImage: data.profileImage || prev.profileImage || '',
      }));

      if (data.profileImage && data.profileImage !== previewImage) {
        setPreviewImage(data.profileImage);
      }
    }
  }, [data]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setPreviewImage(result);
        setFormData((prev) => ({ ...prev, profileImage: result }));

        Swal.fire({
          icon: 'success',
          title: 'Profile Picture Updated',
          text: 'Your profile picture was updated successfully!',
          timer: 2000,
          showConfirmButton: false,
          background: '#f8fafc',
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = { ...formData };
    if (!payload.password) delete payload.password;

    try {
      await updateProfile(payload).unwrap();
      setPreviewImage(payload.profileImage || null);

      Swal.fire({
        icon: 'success',
        title: 'Profile Details Updated',
        text: 'Your profile details were saved successfully!',
        timer: 2000,
        showConfirmButton: false,
        background: '#f8fafc',
      });

      setShowForm(false);
    } catch (err) {
      console.error(err);
      Swal.fire({
        icon: 'error',
        title: 'Update Failed',
        text: 'Something went wrong while updating your profile.',
        background: '#f8fafc',
      });
    }
  };

  if (isLoading) return (
    <div className="flex justify-center items-center h-64">
      <p className="text-lg text-gray-600 animate-pulse">Loading your profile...</p>
    </div>
  );

  if (error) return (
    <div className="flex justify-center items-center h-64">
      <p className="text-lg text-red-500">Failed to load profile data</p>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8">
      {!showForm ? (
        <div className="bg-rose-100 rounded-xl shadow-sm overflow-hidden">
          <div className="p-6 sm:p-8">
            <div className="flex flex-col items-center mb-8">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6">My Profile</h2>

              <div className="relative mb-6">
                {previewImage ? (
                  <img
                    src={previewImage}
                    alt="Profile"
                    className="w-32 h-32 rounded-full object-cover border-4 border-rose-100 shadow-sm"
                  />
                ) : (
                  <div className="w-32 h-32 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 border-4 border-rose-100">
                    <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                    </svg>
                  </div>
                )}
              </div>

              <div className="w-full grid md:grid-cols-2 gap-6 bg-gray-50 p-6 rounded-lg">
                <div className="space-y-3">
                  <div className="border-b pb-2">
                    <p className="text-sm font-medium text-gray-500">First Name</p>
                    <p className="text-lg font-semibold text-gray-800">{formData.firstName}</p>
                  </div>
                  <div className="border-b pb-2">
                    <p className="text-sm font-medium text-gray-500">Last Name</p>
                    <p className="text-lg font-semibold text-gray-800">{formData.lastName}</p>
                  </div>
                  <div className="border-b pb-2">
                    <p className="text-sm font-medium text-gray-500">Email</p>
                    <p className="text-lg font-semibold text-gray-800">{formData.email}</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="border-b pb-2">
                    <p className="text-sm font-medium text-gray-500">Phone</p>
                    <p className="text-lg font-semibold text-gray-800">{formData.contactPhone}</p>
                  </div>
                  <div className="border-b pb-2">
                    <p className="text-sm font-medium text-gray-500">Address</p>
                    <p className="text-lg font-semibold text-gray-800">{formData.address}</p>
                  </div>
                  <div className="border-b pb-2">
                    <p className="text-sm font-medium text-gray-500">Password</p>
                    <p className="text-lg font-semibold text-gray-800">********</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-center">
              <button
                onClick={() => setShowForm(true)}
                className="px-6 py-2 !bg-rose-600 text-white font-medium rounded-lg hover:bg-rose-700 transition-colors duration-200 shadow-sm"
              >
                Edit Profile
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="p-6 sm:p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Edit Profile</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-3">
                <label className="block text-sm font-medium text-gray-700">Profile Picture</label>
                <div className="flex items-center gap-4">
                  <label className="cursor-pointer">
                    <div className="px-4 py-2 bg-rose-600 text-white rounded-lg hover:bg-rose-700 transition-colors duration-200 shadow-sm">
                      Upload Image
                    </div>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                    />
                  </label>
                  {previewImage && (
                    <img
                      src={previewImage}
                      alt="Preview"
                      className="w-16 h-16 rounded-full object-cover border-2 border-gray-200"
                    />
                  )}
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <label className="block text-sm font-medium text-gray-700">First Name</label>
                  <input
                    type="text"
                    name="firstName"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-rose-500 focus:border-rose-500"
                    value={formData.firstName}
                    onChange={handleChange}
                  />
                </div>

                <div className="space-y-3">
                  <label className="block text-sm font-medium text-gray-700">Last Name</label>
                  <input
                    type="text"
                    name="lastName"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-rose-500 focus:border-rose-500"
                    value={formData.lastName}
                    onChange={handleChange}
                  />
                </div>

                <div className="space-y-3">
                  <label className="block text-sm font-medium text-gray-700">Email</label>
                  <input
                    type="email"
                    name="email"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed"
                    value={formData.email}
                    onChange={handleChange}
                    disabled
                  />
                </div>

                <div className="space-y-3">
                  <label className="block text-sm font-medium text-gray-700">Phone</label>
                  <input
                    type="text"
                    name="contactPhone"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-rose-500 focus:border-rose-500"
                    value={formData.contactPhone}
                    onChange={handleChange}
                  />
                </div>

                <div className="space-y-3 md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700">New Password (optional)</label>
                  <input
                    type="password"
                    name="password"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-rose-500 focus:border-rose-500"
                    value={formData.password || ''}
                    onChange={handleChange}
                    placeholder="Leave blank to keep current password"
                    disabled
                  />
                </div>

                <div className="space-y-3 md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700">Address</label>
                  <textarea
                    name="address"
                    rows={3}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-rose-500 focus:border-rose-500"
                    value={formData.address}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="flex justify-end gap-4 pt-4">
                <button
                  type="button"
                  className="px-6 py-2 !bg-gray-500 text-white font-medium rounded-lg hover:bg-gray-600 transition-colors duration-200"
                  onClick={() => setShowForm(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 !bg-rose-600 text-white font-medium rounded-lg hover:bg-rose-700 transition-colors duration-200"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyProfile;