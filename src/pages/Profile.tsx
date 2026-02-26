import { useEffect, useState } from "react";
import axios from "axios";
import { getToken } from "../utils/auth";

interface User {
  name: string;
  username: string;
  email: string;
  phone?: string;
  age?: number;
  gender?: string;
}

const Profile = () => {
  const [user, setUser] = useState<User | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/auth/me`,
          {
            headers: {
              Authorization: `Bearer ${getToken()}`,
            },
          }
        );

        setUser(res.data);
        setForm(res.data);
      } catch (err) {
        console.error("Failed to load profile");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    if (!form) return;
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      const res = await axios.put(
        `${import.meta.env.VITE_API_URL}/api/auth/update-profile`,
        form,
        {
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
        }
      );

      setUser(res.data);
      setForm(res.data);
      setEditMode(false);
    } catch (err) {
      console.error("Update failed");
    }
  };

  if (loading) {
    return <div className="text-center mt-20">Loading profile...</div>;
  }

  if (!user || !form) {
    return <div className="text-center mt-20">Profile not found.</div>;
  }

  return (
    <div className="bg-gray-100 min-h-screen py-12">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-10">

        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-[#0A7DCF]">
              {user.name}
            </h1>
            <p className="text-gray-500">@{user.username}</p>
          </div>

          <button
            onClick={() => setEditMode(!editMode)}
            className="px-5 py-2 bg-[#0A7DCF] text-white rounded-lg hover:bg-blue-700 transition"
          >
            {editMode ? "Cancel" : "Edit Profile"}
          </button>
        </div>

        {/* Profile Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* Email */}
          <div>
            <label className="text-sm text-gray-500">Email</label>
            <input
              type="text"
              value={form.email}
              disabled
              className="w-full border rounded-lg p-3 mt-1 bg-gray-100"
            />
          </div>

          {/* Phone */}
          <div>
            <label className="text-sm text-gray-500">Phone</label>
            <input
              type="text"
              name="phone"
              value={form.phone || ""}
              disabled={!editMode}
              onChange={handleChange}
              className="w-full border rounded-lg p-3 mt-1"
            />
          </div>

          {/* Age */}
          <div>
            <label className="text-sm text-gray-500">Age</label>
            <input
              type="number"
              name="age"
              value={form.age || ""}
              disabled={!editMode}
              onChange={handleChange}
              className="w-full border rounded-lg p-3 mt-1"
            />
          </div>

          {/* Gender */}
          <div>
            <label className="text-sm text-gray-500">Gender</label>
            <select
              name="gender"
              value={form.gender || ""}
              disabled={!editMode}
              onChange={handleChange}
              className="w-full border rounded-lg p-3 mt-1"
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>
        </div>

        {editMode && (
          <div className="mt-8 text-right">
            <button
              onClick={handleSave}
              className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
            >
              Save Changes
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
