import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, Typography, Button, Grid, Table, TableHead, TableRow, TableCell, TableBody, Paper } from '@mui/material';
import ImportantNotePR from '../components/ImportantNotePR';

const PatientRecords = () => {
  const navigate = useNavigate();

  const [appointments, setAppointments] = useState([]);
  const [recentPatients, setRecentPatients] = useState([]);

  useEffect(() => {
    const today = new Date().toISOString().slice(0, 10);

    setAppointments([
      { time: '10:00 AM', name: 'Amit Shah', dept: 'Ortho', note: 'Braces check' },
      { time: '11:30 AM', name: 'Sara Ali', dept: 'General', note: 'Tooth cleaning' }
    ]);

    setRecentPatients([
      { name: 'Ravi Kumar', age: 32, phone: '9999999999', date: today, diagnosis: 'Cavity' },
      { name: 'Anjali Menon', age: 25, phone: '8888888888', date: today, diagnosis: 'Root Canal' },
      { name: 'Suresh Raina', age: 40, phone: '7777777777', date: today, diagnosis: 'Scaling' },
      { name: 'Fatima Noor', age: 30, phone: '6666666666', date: today, diagnosis: 'Extraction' },
      { name: 'Vikram Das', age: 29, phone: '5555555555', date: today, diagnosis: 'Crown' }
    ]);
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <Typography variant="h4" gutterBottom>
        Patient Records
      </Typography>

      {/* Top Cards */}

      <Grid container spacing={10}>
        <Grid item xs={12} md={8}>
          <Card sx={{ 
            backgroundColor: 'White', 
            borderRadius: '12px',
            width: '100%', 
            height: '250px',   
            padding: '16px',    
           }}>
            <CardContent>
              <Typography variant="h6">New Case Sheet</Typography>
              <Typography variant="body2" gutterBottom>
                Start a new case sheet.
              </Typography>
             <Button
  variant="contained"
  onClick={() => navigate('/patient-form')}
  sx={{
    backgroundColor: '#0d8ca6',
    '&:hover': {
      backgroundColor: '#0c7a92' // optional: darker on hover
    }
  }}
>
  OPEN
</Button>

            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={8}>
          <Card sx={{ backgroundColor: 'White', 
            borderRadius: '12px', 
            width: '100%',
            height: '250px',
            padding: '16px', 

            }}>
            <CardContent>
              <Typography variant="h6">Patient List</Typography>
              <Typography variant="body2" gutterBottom>
                View and manage all patient list.
              </Typography>
             <Button
  variant="contained"
  onClick={() => navigate('/patient-form')}
  sx={{
    backgroundColor: '#0d8ca6',
    '&:hover': {
      backgroundColor: '#0c7a92' // optional: darker on hover
    }
  }}
>
  OPEN
</Button>

            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
         <Card
  sx={{
    backgroundColor: '#ffdddd',
    borderRadius: '16px',
    width: '100%',
    height: '250px',
    padding: '16px ',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
  }}
>

           <CardContent sx={{ paddingRight: 3, paddingLeft: 2, paddingBottom: 2 }}>

              <ImportantNotePR />
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Appointments Section */}
      <Typography variant="h5" sx={{ mt: 4, mb: 2 }}>
        Today’s Appointments
      </Typography>
      <Paper elevation={3}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Time</TableCell>
              <TableCell>Patient</TableCell>
              <TableCell>Department</TableCell>
              <TableCell>Note</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {appointments.map((appt, index) => (
              <TableRow key={index}>
                <TableCell>{appt.time}</TableCell>
                <TableCell>{appt.name}</TableCell>
                <TableCell>{appt.dept}</TableCell>
                <TableCell>{appt.note}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>

      {/* Recent Patients Section */}
      <Typography variant="h5" sx={{ mt: 4, mb: 2 }}>
        Recent Patients
      </Typography>
      <Paper elevation={3}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Age</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Diagnosis</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {recentPatients.map((patient, index) => (
              <TableRow key={index}>
                <TableCell>{patient.name}</TableCell>
                <TableCell>{patient.age}</TableCell>
                <TableCell>{patient.phone}</TableCell>
                <TableCell>{patient.date}</TableCell>
                <TableCell>{patient.diagnosis}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </div>
  );
};

export default PatientRecords;
