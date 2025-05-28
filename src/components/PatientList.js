import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './PatientList.css';

const PatientList = () => {
  const [patients, setPatients] = useState([]);
  const [editId, setEditId] = useState(null);
  const [editedPatient, setEditedPatient] = useState({});

  useEffect(() => {
    axios.get('http://localhost:5000/api/patients')
      .then((res) => setPatients(res.data))
      .catch((err) => console.error(err));
  }, []);

  const handleEdit = (patient) => {
    setEditId(patient._id);
    setEditedPatient({ ...patient });
  };

  const handleCancel = () => {
    setEditId(null);
    setEditedPatient({});
  };

  const handleSave = async () => {
    try {
      await axios.put(`http://localhost:5000/api/patients/${editId}`, editedPatient);
      setPatients((prev) =>
        prev.map((p) => (p._id === editId ? editedPatient : p))
      );
      setEditId(null);
    } catch (err) {
      alert('❌ Failed to update patient');
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this patient?')) return;
    try {
      await axios.delete(`http://localhost:5000/api/patients/${id}`);
      setPatients((prev) => prev.filter((p) => p._id !== id));
    } catch (err) {
      alert('❌ Could not delete patient');
      console.error(err);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'allergies' || name === 'conditions') {
      setEditedPatient((prev) => ({
        ...prev,
        medicalHistory: {
          ...prev.medicalHistory,
          [name]: value,
        },
      }));
    } else {
      setEditedPatient((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  return (
    <div className="patient-list">
      <h2>All Patients</h2>
      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>Serial</th>
              <th>Date</th>
              <th>Name</th>
              <th>Age</th>
              <th>Gender</th>
              <th>Contact</th>
              <th>Chief Complaint</th>
              <th>Allergies</th>
              <th>Conditions</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {patients.map((p) => (
              <tr key={p._id}>
                <td>{editId === p._id ? <input name="serialNumber" value={editedPatient.serialNumber} onChange={handleChange} /> : p.serialNumber}</td>
                
                <td>
                  {editId === p._id ? (
                    <input
                      type="date"
                      name="date"
                      value={editedPatient.date?.slice(0, 10) || ''}
                      onChange={handleChange}
                    />
                  ) : (
                    new Date(p.date).toISOString().split('T')[0]
                  )}
                </td>

                <td>{editId === p._id ? <input name="name" value={editedPatient.name} onChange={handleChange} /> : p.name}</td>
                <td>{editId === p._id ? <input name="age" value={editedPatient.age} onChange={handleChange} /> : p.age}</td>
                <td>{editId === p._id ? <input name="gender" value={editedPatient.gender} onChange={handleChange} /> : p.gender}</td>
                <td>{editId === p._id ? <input name="contact" value={editedPatient.contact} onChange={handleChange} /> : p.contact}</td>
                <td>{editId === p._id ? <input name="chiefComplaint" value={editedPatient.chiefComplaint} onChange={handleChange} /> : p.chiefComplaint}</td>
                <td>{editId === p._id ? <input name="allergies" value={editedPatient.medicalHistory.allergies} onChange={handleChange} /> : p.medicalHistory.allergies}</td>
                <td>{editId === p._id ? <input name="conditions" value={editedPatient.medicalHistory.conditions} onChange={handleChange} /> : p.medicalHistory.conditions}</td>
                <td>
                  {editId === p._id ? (
                    <>
                      <button className="icon-btn" onClick={handleSave} title="Save">💾</button>
                      <button className="icon-btn" onClick={handleCancel} title="Cancel">❌</button>
                      <button className="icon-btn" onClick={() => handleDelete(p._id)} title="Delete">🗑️</button>
                    </>
                  ) : (
                    <button className="btn edit" onClick={() => handleEdit(p)}>Edit</button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PatientList;
