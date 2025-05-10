import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../assets/adminreports.css'; // Add your CSS file for styling
import AdminNavbar from '../components/AdminNavbar';

export default function AdminReports() {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    // Fetch all users
    const fetchUsers = async () => {
      try {
        const response = await axios.get('/users'); // Fetch users from the backend
        setUsers(response.data);
        setFilteredUsers(response.data); // Initialize filtered users
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    const filtered = users.filter((user) =>
      user.name.toLowerCase().includes(query)
    );
    setFilteredUsers(filtered);
  };

  const handleDeleteUser = async (userId) => {
    try {
      await axios.delete(`/users/${userId}`); // Delete the user from the backend
      setUsers((prevUsers) => prevUsers.filter((user) => user._id !== userId)); // Remove from state
      setFilteredUsers((prevUsers) => prevUsers.filter((user) => user._id !== userId));
      alert('User deleted successfully!');
    } catch (error) {
      console.error('Error deleting user:', error);
      alert('Failed to delete the user.');
    }
  };

  return (
    <>
    <AdminNavbar />
    <div className="admin-reports-container">
      <h1>User Reports</h1>
      <div className="search-bar-container">
        <input
          type="text"
          placeholder="Search Reports"
          value={searchQuery}
          onChange={handleSearch}
          className="search-bar"
        />
      </div>
      <table className="user-table">
        <thead>
          <tr>
            <th>UserId</th>
            <th>Name</th>
            <th>E-mail</th>
            <th>Phone.No</th>
            <th>Type</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((user) => (
            <tr key={user._id}>
              <td>#{user._id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.phone}</td>
              <td>{user.type}</td>
              <td>
                <button
                  className="delete-btn"
                  onClick={() => handleDeleteUser(user._id)}
                >
                  🗑️ Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </>
  );
}