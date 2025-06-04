import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserRole } from '../context/UserRoleContext';
import './LoginPage.css';

const LoginPage = () => {
  const [role, setRole] = useState('');
  const [adminPassword, setAdminPassword] = useState('');
  const [showPasswordBox, setShowPasswordBox] = useState(false);
  const navigate = useNavigate();
  const { setRole: setUserRole } = useUserRole();

  const handleLogin = () => {
    if (!role) {
      alert('Please choose a role');
      return;
    }

    if (role === 'admin') {
      setShowPasswordBox(true);
    } else {
      setUserRole(role);              // saved to context + localStorage
      navigate('/home');
    }
  };

  const verifyAdmin = () => {
    if (adminPassword === 'Admin@2025') {
      setUserRole('admin');
      navigate('/home');
    } else {
      alert('Incorrect password');
    }
  };

  return (
    <div className="login-container">
      <h2 className="login-title">Select Your Role</h2>

      <div className="login-box">
        <select
          className="login-select"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="">-- Choose Role --</option>
          <option value="admin">Admin</option>
          <option value="doctor">Doctor</option>
          <option value="assistant">Dental Assistant</option>
          <option value="office">Office Staff</option>
          <option value="receptionist">Receptionist</option>
          <option value="manager">Manager</option>
          <option value="lab">Lab Worker</option>
          <option value="finance">Finance Manager</option>
        </select>

        <button onClick={handleLogin} className="login-btn">Login</button>
      </div>

      {showPasswordBox && (
        <div className="modal-overlay">
          <div className="modal-box">
            <h3>🔐 Admin Login</h3>
            <input
              type="password"
              autoComplete="off"
              autoCorrect="off"
              spellCheck="false"
              name="adminSecret"
              id="adminSecret"
              placeholder="Enter Admin Password"
              value={adminPassword}
              onChange={(e) => setAdminPassword(e.target.value)}
              className="password-input"
            />
            <div className="modal-actions">
              <button onClick={verifyAdmin} className="login-btn">Login</button>
              <button onClick={() => setShowPasswordBox(false)} className="cancel-btn">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LoginPage;
