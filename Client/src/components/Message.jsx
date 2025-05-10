import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../assets/message.css'; // Add your CSS file for styling

function Message() {
  const [contacts, setContacts] = useState([]);
  const [selectedMessage, setSelectedMessage] = useState(null);


  useEffect(() => {
    // Fetch data from the backend
    const fetchContacts = async () => {
      try {
        const response = await axios.get('/contact');
        setContacts(response.data);
      } catch (error) {
        console.error('Error fetching contacts:', error);
      }
    };

    fetchContacts();
  }, []);

  const handleSelectMessage = (message) => {
    setSelectedMessage(message);
  };

  const handleClosePopup = () => {
    setSelectedMessage(null);
  };

  const handleDeleteMessage = async (id) => {
    try {
      await axios.delete(`/contact/${id}`); // Send DELETE request to the backend
      setContacts((prevContacts) => prevContacts.filter((contact) => contact._id !== id)); // Remove the message from the state
      alert('Message deleted successfully!');
    } catch (error) {
      console.error('Error deleting message:', error);
      alert('Failed to delete the message.');
    }
  };

  return (   
        <>
          <h1 className='message-title'>Contact Messages</h1>
          <table className="message-table">
            <thead className="message-table-header">
              <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>Phone Number</th>
                <th>Message</th>
                <th>Date</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {contacts.map((contact) => (
                <tr key={contact._id}>
                  <td>{contact.firstName}</td>
                  <td>{contact.lastName}</td>
                  <td>{contact.email}</td>
                  <td>{contact.phoneNumber}</td>
                  <td>{contact.message.substring(0, 30)}...</td>
                  <td>{new Date(contact.date).toLocaleDateString()}</td>
                  <td className='action-buttons'>
                <button
                  className="delete-btn"
                  onClick={() => handleDeleteMessage(contact._id)}
                >
                  Delete
                </button>
                  <button
                  className="view-btn"
                  onClick={() => handleSelectMessage(contact.message)}
                >
                  View
                </button>
              </td>
              
                </tr>
              ))}
            </tbody>
          </table>
            <div className="message-count">Total Messages: {contacts.length}</div>

      {/* Popup for Selected Message */}
      {selectedMessage && (
        <div className="message-popup">
          <div className="message-popup-content">
            <h2>Message Details</h2>
            <p>{selectedMessage}</p>
            <button className="close-popup-btn" onClick={handleClosePopup}>
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default Message;