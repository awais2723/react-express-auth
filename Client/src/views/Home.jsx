import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate hook
import axiosInstance from '../utils/axiosInstance';

const Home = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Initialize the navigate hook

  // Fetch users from the backend
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axiosInstance.get('/users/', {
          headers: { Authorization: `Bearer ${token}` }
        });
        // Sort users by their ID
        const sortedUsers = response.data.users.sort((a, b) => a.id - b.id);
        setUsers(sortedUsers);
      } catch (err) {
        setError("Failed to load users.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // Logout functionality
  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove the token from localStorage
    navigate("/login"); // Redirect to the login page
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-purple-500 to-pink-500">
      <div className="w-full max-w-4xl p-6 bg-white bg-opacity-20 backdrop-blur-md rounded-lg shadow-lg">
        <div className="text-center text-white">
          <h1 className="mb-6 text-5xl font-bold">Welcome to the Home Page!</h1>
          <p className="mb-6 text-lg">
            You've successfully logged in. Here's a list of all registered users.
          </p>
        </div>
        <div className="overflow-x-auto">
          {loading ? (
            <p className="text-white text-center">Loading users...</p>
          ) : error ? (
            <p className="text-red-500 text-center">{error}</p>
          ) : (
            <table className="w-full text-white border-collapse">
              <thead>
                <tr className="bg-purple-700">
                  <th className="p-3 text-left border-b border-purple-500">ID</th>
                  <th className="p-3 text-left border-b border-purple-500">Username</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id} className="hover:bg-purple-600">
                    <td className="p-3 border-b border-purple-500">{user.id}</td>
                    <td className="p-3 border-b border-purple-500">{user.username}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
        <div className="mt-6 text-center">
          <button
            onClick={handleLogout} // Call the handleLogout function on button click
            className="px-6 py-2 text-lg text-3xl bg-white rounded-md text-purple-600 hover:bg-purple-200"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
