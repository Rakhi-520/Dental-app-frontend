import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserRole } from '../context/UserRoleContext';
import './Home.css';

// ICON IMPORTS from MUI
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import Inventory2Icon from '@mui/icons-material/Inventory2';
import ImageIcon from '@mui/icons-material/Image';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import SettingsIcon from '@mui/icons-material/Settings';



const Home = () => {
  const navigate = useNavigate();
  const { role } = useUserRole();
  const safeRole = role || 'assistant';

  const access = JSON.parse(localStorage.getItem('pageAccess')) || {
    admin: {},
    assistant: {},
    lab: {},
  };

  const allLinks = [
    {
      title: 'Patient Records',
      route: '/patient-records',
      key: 'patientRecords',
      icon: <MedicalServicesIcon fontSize="large" style={{ color: '#0077b6' }} />,
    },
    {
      title: 'Appointments',
      route: '/appointments',
      key: 'appointments',
      icon: <EventAvailableIcon fontSize="large" style={{ color: '#0077b6' }} />,
    },
    {
      title: 'AI Dental Assistant',
      route: '/ai-assistant',
      key: 'aiAssistant',
      icon: <SmartToyIcon fontSize="large" style={{ color: '#0077b6' }} />,
    },
    {
      title: 'Finance & Billing',
      route: '/finance',
      key: 'finance',
      icon: <AttachMoneyIcon fontSize="large" style={{ color: '#0077b6' }} />,
    },
    {
      title: 'Inventory Management',
      route: '/stock',
      key: 'inventory',
      icon: <Inventory2Icon fontSize="large" style={{ color: '#0077b6' }} />,
    },
    {
  title: 'Lab Work Tracking',
  route: '/lab-tracking',
  key: 'lab',
  icon: (
    <img
  src={require('../assets/tooth-icon.png')}
  alt="Tooth Icon"
  style={{
    width: 40,
    height: 40,
    filter: 'invert(37%) sepia(94%) saturate(506%) hue-rotate(169deg) brightness(96%) contrast(91%)',
  }}
/>

    ),
    },


    {
      title: 'Illustrations',
      route: '/illustrations',
      key: 'illustrations',
      icon: <ImageIcon fontSize="large" style={{ color: '#0077b6' }} />,
    },
    {
      title: 'Dental Diary',
      route: '/notes',
      key: 'notes',
      icon: <MenuBookIcon fontSize="large" style={{ color: '#0077b6' }} />,
    },
    {
      title: 'Access Settings',
      route: '/config',
      key: 'config',
      icon: <SettingsIcon fontSize="large" style={{ color: '#0077b6' }} />,
    },
  ];

  return (
    <div className="home-container">
      {/* Header */}
      <div className="clinic-header">
        <div className="clinic-title-box">
          <h1 className="clinic-name">ELITE DENTAL CLINIC</h1>
          <p className="doctor-names">
            Dr. Chikku Paulo, B.D.S &nbsp;&nbsp; & &nbsp;&nbsp; Dr. Gayathri Balagopal, B.D.S
          </p>
        </div>
      </div>

      {/* Cards */}
      <div className="quick-links">
        {allLinks.map((link, idx) => {
          const isAllowed = safeRole === 'admin' || access[safeRole]?.[link.key];
          return (
            <div
              key={idx}
              className={`card ${!isAllowed ? 'locked' : ''}`}
              onClick={() => isAllowed && navigate(link.route)}
              title={!isAllowed ? 'Access Denied - Not Assigned' : ''}
              style={{ cursor: isAllowed ? 'pointer' : 'not-allowed' }}
            >
              <div style={{ marginBottom: '0.5rem' }}>{link.icon}</div>
              <h3>{link.title}</h3>
              <button disabled={!isAllowed}>
                {isAllowed ? 'Go' : '🔒'}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Home;
