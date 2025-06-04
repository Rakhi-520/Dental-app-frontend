import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './PatientList.css';

const PatientList = () => {
  const [patients, setPatients] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  const navigate = useNavigate();

  // Fetch all patients from API
  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/patients');
        setPatients(response.data);
      } catch (error) {
        console.error('Error fetching patients:', error);
      }
    };

    fetchPatients();
  }, []);

  // Handle query from global search (like name or phone search)
  useEffect(() => {
    const query = localStorage.getItem('globalSearchQuery');
    if (query) {
      setSearchInput(query);
      localStorage.removeItem('globalSearchQuery');
    }
  }, []);

  // View full patient details
  const handleViewDetails = (id) => {
    navigate(`/patients/${id}`);
  };

  // Format date for table display
  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString();
  };

  // Filter patients based on search input
  const filteredPatients = patients.filter((patient) => {
    const lowerQuery = searchInput.toLowerCase();
    return (
      patient.name?.toLowerCase().includes(lowerQuery) ||
      patient.phone?.includes(lowerQuery) ||
      patient.diagnosis?.toLowerCase().includes(lowerQuery)
    );
  });

  return (
    <div className="patient-list-container">
      <h2>PATIENT LIST</h2>

      {/* Local Search Bar */}
      <input
        type="text"
        placeholder="Search by name, phone or diagnosis..."
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
        className="patient-search-bar"
      />

      {/* Patient Table */}
      <table className="patient-table">
        <thead>
          <tr>
            <th>OP No.</th>
            <th>Date</th>
            <th>Name</th>
            <th>Age</th>
            <th>Phone</th>
            <th>Diagnosis</th>
            <th>Treatment Done</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredPatients.length > 0 ? (
            filteredPatients.map((patient, index) => (
              <tr key={patient._id}>
                <td>{index + 1}</td>
                <td>{formatDate(patient.date)}</td>
                <td>{patient.name}</td>
                <td>{patient.age}</td>
                <td>{patient.phone || 'N/A'}</td>
                <td>{patient.diagnosis || 'N/A'}</td>
                <td>
                  {Array.isArray(patient.treatmentPlan)
                    ? patient.treatmentPlan.join(', ')
                    : patient.treatmentPlan || 'N/A'}
                </td>
                <td>
                  <button className="details-btn" onClick={() => handleViewDetails(patient._id)}>
                    Details
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="8" style={{ textAlign: 'center' }}>
                No patients found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default PatientList;
