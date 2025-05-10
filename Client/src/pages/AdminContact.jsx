import React from 'react';
import Footer from '../components/Footer';
import Message from '../components/Message';
import AdminNavbar from '../components/AdminNavbar';

function AdminContact() {
  return (
    <>
      <AdminNavbar />
      <div className="admin-contact-container">
        <Message />
      </div>
      <Footer />
    </>
  );
}

export default AdminContact;