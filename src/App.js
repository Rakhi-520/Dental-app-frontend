import React, { useState } from 'react';
import Header from './components/Header';
import PatientList from './components/PatientList';
import PatientForm from './components/PatientForm';
import Modal from './components/Modal';
import './App.css';

function App() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [refresh, setRefresh] = useState(false); // For reloading the list after add

  const handleFormSubmit = () => {
    setIsFormOpen(false);
    setRefresh(!refresh); // Toggle refresh to reload patient list
  };

  return (
    <div className="App">
      {/* Header with logo, banner, and clinic details */}
      <Header />

      {/* Add Patient Button */}
      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <button onClick={() => setIsFormOpen(true)} className="add-btn">
          + Add New Patient
        </button>
      </div>

      {/* Patient Table List */}
      <PatientList refresh={refresh} />

      {/* Modal with Patient Form */}
      <Modal isOpen={isFormOpen} onClose={() => setIsFormOpen(false)}>
        <PatientForm
          onSuccess={handleFormSubmit}
          onCancel={() => setIsFormOpen(false)}
        />
      </Modal>
    </div>
  );
}

export default App;
