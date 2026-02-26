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
      } catch (error) {
        console.error("Failed to load profile");
      }
    };

    fetchProfile();
  }, []);

  if (!user) return <div className="p-10 text-center">Loading...</div>;

  return (
    <div className="max-w-4xl mx-auto mt-12 bg-white shadow rounded-2xl p-10">
      
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-[#0A7DCF]">
          Hello, {user.username}
        </h1>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-gray-700 text-lg">
        <div>
          <span className="font-semibold">Name:</span> {user.name}
        </div>

        <div>
          <span className="font-semibold">Email:</span> {user.email}
        </div>

        {user.phone && (
          <div>
            <span className="font-semibold">Phone:</span> {user.phone}
          </div>
        )}

        {user.age && (
          <div>
            <span className="font-semibold">Age:</span> {user.age}
          </div>
        )}

        {user.gender && (
          <div>
            <span className="font-semibold">Gender:</span> {user.gender}
          </div>
        )}
      </div>

    </div>
  );
};

export default Profile;
