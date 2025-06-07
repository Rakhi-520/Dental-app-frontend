// import axios from 'axios';
import { useState, useEffect, useRef } from 'react';
import './PatientForm.css';
import toothChartImg from '../../assets/tooth-chart-img.png';

const problemOptions = ['Caries', 'Mobility', 'Periodontitis', 'Prosthesis'];

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
    prescriptions: [],
    toothConditions: {},
    showToothChart: false
  });

  const [selectedTooth, setSelectedTooth] = useState(null);
  const [toothProblem, setToothProblem] = useState('');
  const [toothNote, setToothNote] = useState('');
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

  const handleToothClick = (toothNum) => {
    setSelectedTooth(toothNum);
    const existing = formData.toothConditions[toothNum];
    setToothProblem(existing?.problem || '');
    setToothNote(existing?.notes || '');
  };

  const handleToothSave = () => {
    if (!selectedTooth) return;
    setFormData(prev => ({
      ...prev,
      toothConditions: {
        ...prev.toothConditions,
        [selectedTooth]: { problem: toothProblem, notes: toothNote }
      }
    }));
    setSelectedTooth(null);
    setToothProblem('');
    setToothNote('');
  };

  const handleToothClose = () => {
    setSelectedTooth(null);
    setToothProblem('');
    setToothNote('');
  };
  const handleChange = (e) => {
  const { name, value } = e.target;
  setFormData((prev) => ({
    ...prev,
    [name]: value,
  }));
};
const handleOrthoChange = (e) => {
  const { name, value } = e.target;
  setFormData((prev) => ({
    ...prev,
    orthoProfile: {
      ...prev.orthoProfile,
      [name]: value,
    },
  }));
};


const handleSubmit = (e) => {
  e.preventDefault();
  console.log('Form submitted:', formData);
  // Add axios.post call here if needed
};

const handleFileChange = (e) => {
  const files = Array.from(e.target.files);
  setFormData((prevFormData) => ({
    ...prevFormData,
    uploadedFiles: [...prevFormData.uploadedFiles, ...files]
  }));
};


  const renderToothChart = () => {
    const toothButtonPositions = {
          18: { top: 250, left: 54 },    
      17: { top: 250, left: 100 }, 
      16: { top: 250, left: 150 },
      15: { top: 250, left: 200 }, 
      14: { top: 250, left: 244 }, 
      13: { top: 250, left: 294 },
      12: { top: 250, left: 344 }, 
      11: { top: 250, left: 390 }, 
      
      21: { top: 250, left: 478 },
      22: { top: 250, left: 524 },
      23: { top: 250, left: 570 },
      24: { top: 250, left: 616 },
      25: { top: 250, left: 662 }, 
      26: { top: 250, left: 708 }, 
      27: { top: 250, left: 756 },
      28: { top: 250, left: 802 }, 
      
     
      31: { top: 380, left: 480 }, 
      32: { top: 380, left: 526 }, 
      33: { top: 380, left: 574 },
      34: { top: 380, left: 622 },
      35: { top: 380, left: 670 }, 
      36: { top: 380, left: 714 },
      37: { top: 380, left: 760 },
      38: { top: 380, left: 806 },

      48: { top: 380, left: 62 }, 
      47: { top: 380, left: 106 },
      46: { top: 380, left: 156 },
      45: { top: 380, left: 200 },
      44: { top: 380, left: 250 },
      43: { top: 380, left: 300 }, 
      42: { top: 380, left: 348 }, 
      41: { top: 380, left: 394 }
    };

    return (
      <div className="tooth-chart-wrapper">
        <img src={toothChartImg} alt="Tooth Chart" className="tooth-chart-bg" />
        {Object.entries(toothButtonPositions).map(([tooth, pos]) => (
          <button
            key={tooth}
            className={`tooth-btn-overlay ${formData.toothConditions[tooth] ? 'highlighted' : ''}`}
            style={{ top: `${pos.top}px`, left: `${pos.left}px`, backgroundColor: formData.toothConditions[tooth] ? 'red' : '' }}
            onClick={() => handleToothClick(tooth)}
          >
            {tooth}
          </button>
        ))}
        {selectedTooth && (
          <div className="tooth-popup">
            <h4>Tooth {selectedTooth}</h4>
            <label>
              Problem:
              <select value={toothProblem} onChange={(e) => setToothProblem(e.target.value)}>
                <option value="">--Select--</option>
                {problemOptions.map(opt => <option key={opt}>{opt}</option>)}
              </select>
            </label>
            <label>
              Description:
              <textarea value={toothNote} onChange={(e) => setToothNote(e.target.value)} rows={3} />
            </label>
            <div className="tooth-popup-actions">
              <button onClick={handleToothSave}>Save</button>
              <button onClick={handleToothClose}>Close</button>
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="form-container">
           {/* Dental OP Case Sheet */}
      
      <h1>Dental OP Case Sheet</h1>
      <form onSubmit={handleSubmit}>
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

       {/* Oral Findings */}
<fieldset className="form-section">
  <legend className="section-title">Oral Findings</legend>

  {<button
    type="button"
    className="tooth-chart-toggle-btn"
    onClick={() =>
      setFormData((prev) => ({ ...prev, showToothChart: !prev.showToothChart }))
    }
  >
    {formData.showToothChart ? 'Hide Tooth Chart' : 'Show Tooth Chart'}
  </button> }
 


  {formData.showToothChart && (
    <div className={`tooth-chart-section ${!formData.showToothChart ? 'hidden' : ''}`}>
  <h4>Interactive Tooth Chart</h4>
  {renderToothChart()}
</div>

  )}
</fieldset>

<fieldset>
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
        {/* Add Prescription Table */}
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
                    <button type="button" onClick={() => {
                      const updated = formData.prescriptions.filter((_, i) => i !== index);
                      setFormData({ ...formData, prescriptions: updated });
                    }}>Delete</button>
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
                prescriptions: [...formData.prescriptions, { drugName: '', dosage: '', duration: '' }]
              })
            }
          >
            + Add Row
          </button>
        </fieldset>
      <button type="submit" onClick={handleSubmit}>Save Patient Record</button>
      </form>
    </div>
  );
};


export default PatientForm;
