import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserRole } from '../context/UserRoleContext';
import './Home.css';

import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import Inventory2Icon from '@mui/icons-material/Inventory2';
import ImageIcon from '@mui/icons-material/Image';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import SettingsIcon from '@mui/icons-material/Settings';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import DeleteSweepIcon from '@mui/icons-material/DeleteSweep';

const Home = () => {
  const navigate = useNavigate();
  const { role } = useUserRole();
  const safeRole = role || 'assistant';

  const [importantNotes, setImportantNotes] = useState({});
  const [showNotifications, setShowNotifications] = useState(false);
  const [openNotePage, setOpenNotePage] = useState(null);

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
      pageApiKey: 'patient-records',
      localKey: 'important_note_pr_draft'
    },
    {
      title: 'Appointments',
      route: '/appointments',
      key: 'appointments',
      icon: <EventAvailableIcon fontSize="large" style={{ color: '#0077b6' }} />,
      pageApiKey: 'appointments',
      localKey: 'important_note_appointments_draft'
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
      pageApiKey: 'finance',
      localKey: 'important_note_finance_draft'
    },
    {
      title: 'Inventory Management',
      route: '/stock',
      key: 'inventory',
      icon: <Inventory2Icon fontSize="large" style={{ color: '#0077b6' }} />,
      pageApiKey: 'inventory',
      localKey: 'important_note_inventory_draft'
    },
    {
      title: 'Lab Records',
      route: '/lab-records',
      key: 'lab',
      icon: (
        <img
          src={require('../assets/tooth-icon.png')}
          alt="Tooth Icon"
          style={{
            width: 40,
            height: 40,
            filter:
              'invert(37%) sepia(94%) saturate(506%) hue-rotate(169deg) brightness(96%) contrast(91%)',
          }}
        />
      ),
      pageApiKey: 'lab',
      localKey: 'important_note_lab_draft'
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

  const getLocalImportantNotes = () => {
    const notes = {};
    allLinks.forEach(link => {
      if (link.localKey) {
        const value = localStorage.getItem(link.localKey);
        if (value && value.trim() !== '') {
          notes[link.pageApiKey] = value;
        }
      }
    });
    return notes;
  };

  useEffect(() => {
    if (safeRole !== 'admin') return;
    const localNotes = getLocalImportantNotes();
    setImportantNotes(localNotes);
  }, [safeRole]);

  const toggleNoteView = (pageKey) => {
    setOpenNotePage(prev => (prev === pageKey ? null : pageKey));
  };

  const handleClearAll = () => {
    allLinks.forEach(link => {
      if (link.localKey) {
        localStorage.removeItem(link.localKey);
      }
    });
    setImportantNotes({});
    setOpenNotePage(null);
  };

  return (
    <div className="home-container">

      {/* 🔔 Collapsible Notifications */}
      {safeRole === 'admin' && Object.keys(importantNotes).length > 0 && (
        <div className="important-notifications" style={{ marginBottom: '20px' }}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              backgroundColor: '#ffdddd',
              padding: '10px 15px',
              borderRadius: '8px',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
              cursor: 'pointer',
            }}
            onClick={() => setShowNotifications(!showNotifications)}
          >
            <h3 style={{ margin: 0, color: '#d00000' }}>🔔 Important Notifications</h3>
            {showNotifications ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          </div>

          {showNotifications && (
            <>
              <div style={{ marginTop: '10px' }}>
                {Object.entries(importantNotes).map(([page, content]) =>
                  content?.trim() ? (
                    <div key={page} style={{ marginBottom: '8px' }}>
                      <div
                        onClick={() => toggleNoteView(page)}
                        style={{
                          fontWeight: 'bold',
                          cursor: 'pointer',
                          color: '#005072',
                          backgroundColor: '#e7f3ff',
                          padding: '6px 10px',
                          borderRadius: '5px',
                        }}
                      >
                        {page.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase())}
                        {openNotePage === page ? ' ▲' : ' ▼'}
                      </div>
                      {openNotePage === page && (
                        <div style={{
                          backgroundColor: '#fff3cd',
                          color: '#856404',
                          padding: '10px 15px',
                          borderRadius: '8px',
                          marginTop: '4px'
                        }}>
                          {content}
                        </div>
                      )}
                    </div>
                  ) : null
                )}
              </div>
              <button
                onClick={handleClearAll}
                style={{
                  marginTop: '10px',
                  padding: '6px 12px',
                  borderRadius: '6px',
                  backgroundColor: '#f44336',
                  color: 'white',
                  border: 'none',
                  cursor: 'pointer'
                }}
              >
                <DeleteSweepIcon style={{ marginRight: '5px' }} />
                Clear All
              </button>
            </>
          )}
        </div>
      )}

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
          const hasPageNote = link.pageApiKey && importantNotes[link.pageApiKey]?.trim();

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

              {hasPageNote && (
                <span className="important-indicator"></span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Home;
