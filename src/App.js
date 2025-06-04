import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { UserRoleProvider } from './context/UserRoleContext';

import Layout from './components/Layout';
import LoginPage from './Pages/LoginPage';
import Home from './Pages/Home';
import PageAccessConfig from './Pages/PageAccessConfig';

import PatientForm from './Features/Patient/PatientForm';
import PatientList from './Features/Patient/PatientList'; 
import CaseSheetViewer from './Features/Patient/CaseSheetViewer';
import AppointmentPage from './Pages/Appointment';
import StockPage from './Pages/Inventory';
import FinancePage from './Pages/Finance';
import PatientRecords from './Pages/PatientRecords'; 

function App() {
  return (
    <UserRoleProvider>
      <Router>
        <Routes>
          {/* 🔓 Public Route */}
          <Route path="/" element={<LoginPage />} />

          {/* 🔒 Protected Routes inside Layout */}
          <Route element={<Layout />}>
            <Route path="/home" element={<Home />} />
            <Route path="/config" element={<PageAccessConfig />} />
            <Route path="/patient-form" element={<PatientForm />} />

            {/* Patient Section */}
            <Route path="/patient-records" element={<PatientRecords />} />
            <Route path="/patients/list" element={<PatientList />} />
            <Route path="/patients/:id" element={<CaseSheetViewer />} />

            {/* Other Modules */}
            <Route path="/appointments" element={<AppointmentPage />} />
            <Route path="/stock" element={<StockPage />} />
            <Route path="/finance" element={<FinancePage />} />
          </Route>
        </Routes>
      </Router>
    </UserRoleProvider>
  );
}

export default App;
