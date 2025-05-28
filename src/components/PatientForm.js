import React, { useState } from 'react';
import axios from 'axios';
import './PatientForm.css';

const PatientForm = ({ onSuccess, onCancel }) => {
  const [patient, setPatient] = useState({
    serialNumber: '',
    date: '',
    name: '',
    age: '',
    gender: '',
    contact: '',
    chiefComplaint: '',
    medicalHistory: {
      allergies: '',
      conditions: ''
    }
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'allergies' || name === 'conditions') {
      setPatient((prev) => ({
        ...prev,
        medicalHistory: {
          ...prev.medicalHistory,
          [name]: value
        }
      }));
    } else {
      setPatient((prev) => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/patients', patient);
      alert('✅ Patient added successfully!');
      setPatient({
        serialNumber: '',
        date: '',
        name: '',
        age: '',
        gender: '',
        contact: '',
        chiefComplaint: '',
        medicalHistory: {
          allergies: '',
          conditions: ''
        }
      });
      if (onSuccess) onSuccess();
    } catch (error) {
      alert('❌ Failed to add patient. Please try again.');
      console.error(error);
    }
  };

  return (
    <form className="patient-form" onSubmit={handleSubmit}>
      <h2 className="form-title">Add New Patient</h2>

      <input
        type="number"
        name="serialNumber"
        placeholder="Serial Number"
        value={patient.serialNumber}
        onChange={handleChange}
        required
      />

      <input
        type="date"
        name="date"
        value={patient.date}
        onChange={handleChange}
        required
      />

      <input
        type="text"
        name="name"
        placeholder="Full Name"
        value={patient.name}
        onChange={handleChange}
        required
      />

      <input
        type="number"
        name="age"
        placeholder="Age"
        value={patient.age}
        onChange={handleChange}
        required
      />

      <select
        name="gender"
        value={patient.gender}
        onChange={handleChange}
        required
      >
        <option value="">Select Gender</option>
        <option value="Male">Male</option>
        <option value="Female">Female</option>
        <option value="Other">Other</option>
      </select>

      <input
        type="text"
        name="contact"
        placeholder="Contact Number"
        value={patient.contact}
        onChange={handleChange}
        required
      />

      <textarea
       name="chiefComplaint"
       placeholder="Chief Complaints"
       value={patient.chiefComplaint}
       onChange={handleChange}
     />

      <textarea
        name="allergies"
        placeholder="Allergies"
        value={patient.medicalHistory.allergies}
        onChange={handleChange}
      ></textarea>

      <textarea
        name="conditions"
        placeholder="Existing Conditions"
        value={patient.medicalHistory.conditions}
        onChange={handleChange}
      ></textarea>

      <div className="form-buttons">
        <button type="submit">Add Patient</button>
        <button type="button" className="cancel-btn" onClick={onCancel}>Cancel</button>
      </div>
    </form>
  );
};

export default PatientForm;
