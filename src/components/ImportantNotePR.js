import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { IconButton } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import DeleteSweepIcon from '@mui/icons-material/DeleteSweep';
import AssignmentIcon from '@mui/icons-material/Assignment';
const ImportantNotePR = ({ userRole = 'user', showNotification = false }) => {
  const LOCAL_KEY = 'important_note_pr_draft';

  const [note, setNote] = useState('');
  const [noteId, setNoteId] = useState(null);
  const [message, setMessage] = useState('');

  // Load note from localStorage first and fetch from backend
  useEffect(() => {
    const draft = localStorage.getItem(LOCAL_KEY);
    if (draft) {
      setNote(draft);
    }

    const fetchNote = async () => {
      try {
        const res = await axios.get('/api/notes/patient-records');
        if (res.data && res.data.content) {
          setNote(res.data.content);
          setNoteId(res.data._id);
          localStorage.setItem(LOCAL_KEY, res.data.content); // cache latest
        }
      } catch (error) {
        console.error('Error fetching note:', error.message);
      }
    };

    fetchNote();
  }, []);

  // Auto-hide status message
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => setMessage(''), 2500);
      return () => clearTimeout(timer);
    }
  }, [message]);

  // 💬 Update note and localStorage live while typing
  const handleTyping = (e) => {
    const value = e.target.value;
    setNote(value);
    localStorage.setItem(LOCAL_KEY, value);

    // 🔁 Trigger live update event for Home (even in same tab)
    window.dispatchEvent(new StorageEvent('storage', {
      key: LOCAL_KEY,
      newValue: value,
    }));
  };

  // ✅ Save note to backend
  const handleSave = async () => {
    const newNoteData = {
      page: 'patient-records',
      content: note,
      createdBy: 'Admin',
      isSaved: false
    };

    try {
      const res = await axios.post('/api/notes', newNoteData);
      setNoteId(res.data._id);
      setMessage('✅ Saved!');
    } catch (error) {
      console.error('Error saving note:', error.response?.data?.message || error.message);
      setMessage('❌ Failed to save');
    }
  };

  // 🧹 Clear note from localStorage and backend
  const handleClear = async () => {
    try {
      if (noteId) await axios.delete(`/api/notes/${noteId}`);
    } catch (error) {
      console.error('Error clearing from DB:', error.message);
    }

    setNote('');
    setNoteId(null);
    localStorage.removeItem(LOCAL_KEY);
    setMessage('🧹 Cleared');

    // Also notify Home to clear notification
    window.dispatchEvent(new StorageEvent('storage', {
      key: LOCAL_KEY,
      newValue: '',
    }));
  };

  return (
    <>
      {/* 🔔 Admin-only notification on Home */}
      {showNotification && userRole === 'admin' && note && (
        <div
          style={{
            backgroundColor: '#fff3cd',
            color: '#856404',
            padding: '10px 15px',
            borderRadius: '8px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            marginBottom: '15px',
            fontSize: '1rem'
          }}
        >
          <strong>Important Note:</strong> {note}
        </div>
      )}

      {/* 📝 Title and action buttons */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '10px',
          gap: '10px'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <AssignmentIcon style={{ fontSize: '28px' }} />
          <h3 style={{ margin: 0, fontSize: '1.2rem' }}>Important Notes</h3>
        </div>
        <div style={{ display: 'flex', gap: '6px' }}>
          <IconButton onClick={handleSave} title="Save" style={{ backgroundColor: '#007b8a', color: 'white' }}>
            <SaveIcon />
          </IconButton>
          <IconButton onClick={handleClear} title="Clear Note" style={{ backgroundColor: '#f57c00', color: 'white' }}>
            <DeleteSweepIcon />
          </IconButton>
        </div>
      </div>

      {/* 🧾 Text Area */}
      <div style={{ padding: '0 16px' }}>
      <textarea
        rows={8}
        style={{
          color: 'red',
          width: '105%',
          height: '150px',
          padding: '12px',
          paddingRight: '50px', 
          fontSize: '1rem',
          border: '2px solid #333',
          borderRadius: '10px',
          backgroundColor: 'white',
          resize: 'none',
          overflowY: 'auto',
          fontFamily: 'inherit',
          boxSizing: 'border-box',
          marginBottom: '10px'
        }}
        placeholder="Type here...."
        value={note}
        onChange={handleTyping}
      ></textarea>
      </div>

      {/* 💬 Status Message */}
      {message && (
        <div
          style={{
            fontSize: '0.9rem',
            color: message.includes('✅') ? 'green' : message.includes('❌') ? 'red' : '#555',
            backgroundColor: '#f0f0f0',
            padding: '6px 10px',
            borderRadius: '6px',
            minHeight: '22px',
            transition: 'opacity 0.3s ease-in-out'
          }}
        >
          {message}
        </div>
      )}
    </>
  );
};

export default ImportantNotePR;
