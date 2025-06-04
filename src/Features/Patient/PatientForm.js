import axios from 'axios';
import React, { useState, useEffect, useRef } from 'react';
import './PatientForm.css';

const PatientForm = () => {
  const [formData, setFormData] = useState({
    name: '', age: '', gender: '', phone: '', address: '', date: '', referredBy: '',
    maritalStatus: '', chiefComplaint: '', medicalHistory: '', allergies: '', medications: '',
    dentalHistory: '', ccOther: '', dhOther: '', investigations: '', otherInvestigation: '',
    uploadedFiles: [], diagnosis: '', treatmentPlan: '', otherTreatmentPlan: '',
    department: '', dentistName: '',
    clinicalFindings: {
      first: Array(8).fill({ cavity: false, mobility: false, missing: false, filling: false }),
      second: Array(8).fill({ cavity: false, mobility: false, missing: false, filling: false }),
      third: Array(8).fill({ cavity: false, mobility: false, missing: false, filling: false }),
      fourth: Array(8).fill({ cavity: false, mobility: false, missing: false, filling: false })
    },
    selectedQuadrant: '', showTable: false,
    orthoProfile: {
      facialProfile: '', lipCompetency: '', overjet: '', overbite: '',
      habits: '', molarRelation: '', crossbite: '', openbite: ''
    },
    prescriptions: []
  });

  const tableRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (tableRef.current && !tableRef.current.contains(event.target) &&
          !event.target.closest('select[name="selectedQuadrant"]')) {
        setFormData(prev => ({ ...prev, showTable: false }));
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleOrthoChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      orthoProfile: { ...prev.orthoProfile, [name]: value }
    }));
  };

  const handleFileChange = (e) => {
    setFormData(prev => ({ ...prev, uploadedFiles: Array.from(e.target.files) }));
  };

  const handleQuadrantSelect = (e) => {
    setFormData(prev => ({
      ...prev,
      selectedQuadrant: e.target.value,
      showTable: true
    }));
  };

  const handleToothCheckboxChange = (quadrant, index, field) => {
    const updatedTeeth = [...formData.clinicalFindings[quadrant]];
    updatedTeeth[index] = { ...updatedTeeth[index], [field]: !updatedTeeth[index][field] };
    setFormData(prev => ({
      ...prev,
      clinicalFindings: { ...prev.clinicalFindings, [quadrant]: updatedTeeth }
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/patients', formData);
      alert('Patient data saved successfully!');
      console.log(response.data);
    } catch (error) {
      console.error('Error saving patient:', error);
      alert('Failed to save patient.');
    }
  };

  const renderQuadrantTable = (quadrant) => (
    <div ref={tableRef} className="quadrant-table">
      <table className="tooth-table">
        <thead>
          <tr>
            <th>Tooth No.</th>
            <th>Cavity</th>
            <th>Mobility</th>
            <th>Missing</th>
            <th>Filling</th>
          </tr>
        </thead>
        <tbody>
          {formData.clinicalFindings[quadrant].map((tooth, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              {['cavity', 'mobility', 'missing', 'filling'].map(field => (
                <td key={field}>
                  <input
                    type="checkbox"
                    checked={tooth[field]}
                    onChange={() => handleToothCheckboxChange(quadrant, index, field)}
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  return (
    <div className="form-container">
      <h1>Dental OP Case Sheet</h1>
      <form onSubmit={handleSubmit}>
       {/* Patient Info */}
        <fieldset>
  <legend>Patient Information</legend>

  <div className="form-row">
    <label>Name:
      <input type="text" name="name" value={formData.name} onChange={handleChange} />
    </label>
    <label>Age:
      <input type="number" name="age" value={formData.age} onChange={handleChange} />
    </label>
  </div>

  <div className="form-row">
    <label>Gender:
      <select name="gender" value={formData.gender} onChange={handleChange}>
        <option value="">--Select--</option>
        <option>Male</option>
        <option>Female</option>
        <option>Other</option>
      </select>
    </label>
    <label>Phone:
      <input type="text" name="phone" value={formData.phone} onChange={handleChange} />
    </label>
  </div>

  <div className="form-row">
    <label>Address:
      <input type="text" name="address" value={formData.address} onChange={handleChange} />
    </label>
    <label>Date:
      <input type="date" name="date" value={formData.date} onChange={handleChange} />
    </label>
  </div>

  <div className="form-row">
    <label>Referred By:
      <select name="referredBy" value={formData.referredBy} onChange={handleChange}>
        <option value="">--Select--</option>
        <option>Self</option>
        <option>Doctor</option>
        <option>Family/Friend</option>
        <option>Online</option>
      </select>
    </label>
    <label>Marital Status:
      <select name="maritalStatus" value={formData.maritalStatus} onChange={handleChange}>
        <option value="">--Select--</option>
        <option>Single</option>
        <option>Married</option>
      </select>
    </label>
  </div>
</fieldset>

        {/* Chief Complaint */}
        <fieldset>
          <legend>Chief Complaint</legend>
          <select name="chiefComplaint" value={formData.chiefComplaint} onChange={handleChange}>
            <option value="">--Select--</option>
            <option value="Tooth Pain">Tooth Pain</option>
            <option value="Swelling">Swelling</option>
            <option value="Bleeding Gums">Bleeding Gums</option>
            <option value="Sensitivity">Sensitivity</option>
            <option value="Bad Breath">Bad Breath</option>
            <option value="Tooth Missing">Tooth Missing</option>
            <option value="Cosmetic Issue">Cosmetic Issue</option>
          </select>
          <label>Others: <input type="text" name="ccOther" value={formData.ccOther} onChange={handleChange} /></label>
        </fieldset>

        {/* Medical History */}
        <fieldset>
          <legend>Medical History</legend>
          <select name="medicalHistory" value={formData.medicalHistory} onChange={handleChange}>
            <option value="">--Select--</option>
            <option value="None">None</option>
            <option value="Diabetes">Diabetes</option>
            <option value="Hypertension">Hypertension</option>
            <option value="Kidney Disease">Kidney Disease</option>
            <option value="Heart Disease">Heart Disease</option>
            <option value="Cancer">Cancer</option>
            <option value="Asthma">Asthma</option>
            <option value="Bleeding Disorders">Bleeding Disorders</option>
          </select>
          <label>Allergies: <input type="text" name="allergies" value={formData.allergies} onChange={handleChange} /></label>
          <label>Medications: <input type="text" name="medications" value={formData.medications} onChange={handleChange} /></label>
        </fieldset>

        {/* Dental History */}
        <fieldset>
          <legend>Dental History</legend>
          <select name="dentalHistory" value={formData.dentalHistory} onChange={handleChange}>
            <option value="">--Select--</option>
            <option value="First Visit">First Visit</option>
            <option value="RCT">RCT</option>
            <option value="Extraction">Extraction</option>
            <option value="Filling">Filling</option>
            <option value="Scaling">Scaling</option>
            <option value="Crown/Denture">Crown/Denture</option>
          </select>
          <label>Others: <input type="text" name="dhOther" value={formData.dhOther} onChange={handleChange} /></label>
        </fieldset>

        {/* Clinical Findings */}
        <fieldset>
          <legend>Clinical Findings</legend>
          <label>Quadrant:
            <select name="selectedQuadrant" value={formData.selectedQuadrant} onChange={handleQuadrantSelect}>
              <option value="">--Select Quadrant--</option>
              <option value="first">First Quadrant</option>
              <option value="second">Second Quadrant</option>
              <option value="third">Third Quadrant</option>
              <option value="fourth">Fourth Quadrant</option>
            </select>
          </label>
          {formData.showTable && renderQuadrantTable(formData.selectedQuadrant)}
        </fieldset>
      <fieldset>

  {/*  Ortho Profile*/}
  <legend>Ortho Profile</legend>

  <div className="form-row">
    <label>Facial Profile:
      <select name="facialProfile" value={formData.orthoProfile.facialProfile} onChange={handleOrthoChange}>
        <option value="">--Select--</option>
        <option>Straight</option>
        <option>Convex</option>
        <option>Concave</option>
      </select>
    </label>
    <label>Lip Competency:
      <select name="lipCompetency" value={formData.orthoProfile.lipCompetency} onChange={handleOrthoChange}>
        <option value="">--Select--</option>
        <option>Competent</option>
        <option>Incompetent</option>
      </select>
    </label>
  </div>

  <div className="form-row">
    <label>Overjet (mm):
      <input type="text" name="overjet" value={formData.orthoProfile.overjet} onChange={handleOrthoChange} />
    </label>
    <label>Overbite (mm):
      <input type="text" name="overbite" value={formData.orthoProfile.overbite} onChange={handleOrthoChange} />
    </label>
  </div>

  <div className="form-row">
    <label>Habits:
      <select name="habits" value={formData.orthoProfile.habits} onChange={handleOrthoChange}>
        <option value="">--Select--</option>
        <option>Thumb Sucking</option>
        <option>Mouth Breathing</option>
        <option>None</option>
      </select>
    </label>
    <label>Molar Relation:
      <select name="molarRelation" value={formData.orthoProfile.molarRelation} onChange={handleOrthoChange}>
        <option value="">--Select--</option>
        <option>Class I</option>
        <option>Class II</option>
        <option>Class III</option>
      </select>
    </label>
  </div>

  <div className="form-row">
    <label>Crossbite:
      <select name="crossbite" value={formData.orthoProfile.crossbite} onChange={handleOrthoChange}>
        <option value="">--Select--</option>
        <option>Yes</option>
        <option>No</option>
      </select>
    </label>
    <label>Openbite:
      <select name="openbite" value={formData.orthoProfile.openbite} onChange={handleOrthoChange}>
        <option value="">--Select--</option>
        <option>Yes</option>
        <option>No</option>
      </select>
    </label>
  </div>
</fieldset>

       {/* Investigations */}
        <fieldset>
          <legend>Investigations</legend>
          <select name="investigations" value={formData.investigations} onChange={handleChange}>
            <option value="">--Select--</option>
            <option value="IOPA X-Ray">IOPA X-Ray</option>
            <option value="OPG">OPG</option>
            <option value="CBCT">CBCT</option>
            <option value="Pulp Vitality Test">Pulp Vitality Test</option>
            <option value="Others">Others</option>
          </select>
          {formData.investigations === 'Others' && (
            <label>
              Specify Others:
              <textarea
                name="otherInvestigation"
                rows="3"
                style={{ width: '100%', marginTop: '10px' }}
                value={formData.otherInvestigation}
                onChange={handleChange}
              />
            </label>
          )}
          <label> Upload Documents :
            <input type="file" multiple onChange={handleFileChange} accept="image/*, .pdf, .doc, .docx" />
          </label>
        </fieldset>

        {/* Diagnosis */}
        <fieldset>
          <legend>Diagnosis</legend>
          <textarea
            name="diagnosis"
            rows="4"
            maxLength="250"
            value={formData.diagnosis}
            onChange={handleChange}
            placeholder="Write diagnosis here..."
            style={{ width: '98%' }}
          />
        </fieldset>

       {/* Treatment Plan */}
        <fieldset>
          <legend>Treatment Plan</legend>
          <select name="treatmentPlan" value={formData.treatmentPlan} onChange={handleChange}>
            <option value="">--Select--</option>
            <option value="Filling">Filling</option>
            <option value="RCT">RCT</option>
            <option value="Extraction">Extraction</option>
            <option value="Crown">Crown</option>
            <option value="Scaling">Scaling</option>
            <option value="Braces">Braces</option>
            <option value="Implant">Implant</option>
            <option value="Others">Others</option>
          </select>
          {formData.treatmentPlan === 'Others' && (
            <label>
              Specify Others:
              <textarea
                name="otherTreatmentPlan"
                rows="3"
                style={{ width: '100%', marginTop: '10px' }}
                value={formData.otherTreatmentPlan}
                onChange={handleChange}
              />
            </label>
          )}
        </fieldset>
     
     {/* Prescriptions */}

      <fieldset>
        <legend>Prescriptions</legend>
        <table className="prescription-table">
          
          <tbody>
            {formData.prescriptions.map((prescription, index) => (
              <tr key={index}>
                <td>
                  <input
                    type="text"
                    placeholder="Medicine Name"
                    value={prescription.drugName}
                    onChange={(e) => {
                      const updated = [...formData.prescriptions];
                      updated[index].drugName = e.target.value;
                      setFormData({ ...formData, prescriptions: updated });
                    }}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    placeholder="Dosage"
                    value={prescription.dosage}
                    onChange={(e) => {
                      const updated = [...formData.prescriptions];
                      updated[index].dosage = e.target.value;
                      setFormData({ ...formData, prescriptions: updated });
                    }}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    placeholder="Duration"
                    value={prescription.duration}
                    onChange={(e) => {
                      const updated = [...formData.prescriptions];
                      updated[index].duration = e.target.value;
                      setFormData({ ...formData, prescriptions: updated });
                    }}
                  />
                </td>
                <td>
                  <button
                    type="button"
                    onClick={() => {
                      const updated = formData.prescriptions.filter((_, i) => i !== index);
                      setFormData({ ...formData, prescriptions: updated });
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button
          type="button"
          onClick={() =>
            setFormData({
              ...formData,
              prescriptions: [
                ...formData.prescriptions,
                { medicineName: '', dosage: '', duration: '' },
              ],
            })
          }
        >
          + Add Row
        </button>
      </fieldset>
      <fieldset>
  <legend>Department Details</legend>

  <label>
    Department:
    <select name="department" value={formData.department} onChange={handleChange}>
      <option value="">--Select--</option>
      <option value="Pedodontics">Pedodontics</option>
      <option value="Orthodontics">Orthodontics</option>
      <option value="Conservative Dentistry">Conservative Dentistry</option>
      <option value="Periodontics">Periodontics</option>
      <option value="Oral Surgery">Oral Surgery</option>
      <option value="Prosthodontics">Prosthodontics</option>
      <option value="Oral Medicine & Radiology">Oral Medicine & Radiology</option>
      <option value="Endodontics">Endodontics</option>
    </select>
  </label>

  <label>
    Dentist's Name:
    <input
      type="text"
      name="dentistName"
      value={formData.dentistName}
      onChange={handleChange}
      placeholder="Dr. "
    />
  </label>
</fieldset>

        
        <button type="submit">Save Patient</button>
      </form>
    </div>
  );
};

export default PatientForm;
