import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { QRCodeCanvas } from 'qrcode.react';

const EntryPass = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('/api/user/profile', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUserData(res.data);
      } catch (err) {
        console.error('Failed to fetch user info');
      }
    };

    fetchProfile();
  }, []);

  return (
    <div className="container text-center mt-5">
      <h2>🚇 Metro Entry QR Pass</h2>
      {userData ? (
        <div style={{ marginTop: '20px' }}>
          <QRCodeCanvas
            value={JSON.stringify({ id: userData._id })}
            size={220}
            level="H"
            includeMargin={true}
          />
          <p className="mt-3">
            Show this code to enter the metro station. It contains your identity info securely.
          </p>
        </div>
      ) : (
        <p>Loading your metro pass...</p>
      )}
    </div>
  );
};

export default EntryPass;
