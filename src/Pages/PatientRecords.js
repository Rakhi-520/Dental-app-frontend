import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import ListAltIcon from '@mui/icons-material/ListAlt';
import ImportantNotePR from '../components/ImportantNotePR';

// Reusable Card Component
const CustomCard = ({
  icon,
  title,
  description,
  buttonLabel,
  onClick,
  color,
  cardHeight,
  cardWidth,
}) => (
  <Card
    sx={{
      height: cardHeight || '220px',
      width: cardWidth || '100%',
      borderRadius: 5,
      boxShadow: '0 4px 18px rgba(0,0,0,0.12)',
      transition: 'transform 0.3s ease, box-shadow 0.3s ease',
      '&:hover': {
        transform: 'scale(1.02)',
        boxShadow: '4px 10px 24px rgba(0,0,0,0.15)',
      },
      backgroundColor: '#ffffff',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
    }}
  >
    <CardContent>
      <Box display="flex" alignItems="center" mb={1}>
        {icon}
        <Typography variant="h6" ml={1} fontWeight={600}>
          {title}
        </Typography>
      </Box>
      <Typography variant="body2" color="text.secondary" mb={2}>
        {description}
      </Typography>
      <Button variant="contained" color={color || 'primary'} onClick={onClick}>
        {buttonLabel}
      </Button>
    </CardContent>
  </Card>
);

const PatientRecords = () => {
  const navigate = useNavigate();
  const [appointments, setAppointments] = useState([]);
  const [recentPatients, setRecentPatients] = useState([]);

  useEffect(() => {
    const today = new Date().toISOString().slice(0, 10);

    setAppointments([
      { time: '10:00 AM', name: 'Amit Shah', dept: 'Ortho', note: 'Braces check' },
      { time: '11:30 AM', name: 'Sara Ali', dept: 'General', note: 'Tooth cleaning' },
    ]);

    setRecentPatients([
      { name: 'Ravi Kumar', age: 32, phone: '9999999999', date: today, diagnosis: 'Cavity' },
      { name: 'Anjali Menon', age: 25, phone: '8888888888', date: today, diagnosis: 'Root Canal' },
      { name: 'Suresh Raina', age: 40, phone: '7777777777', date: today, diagnosis: 'Scaling' },
    ]);
  }, []);

  return (
    <Box sx={{ padding: '30px' }}>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        Patient Records
      </Typography>

      {/* Top Cards Section */}
      <Grid container spacing={3} mb={4}>
        <Grid item xs={12} md={4}>
          <CustomCard
            icon={<NoteAddIcon color="primary" />}
            title="New Case Sheet"
            description="Start a new case sheet entry "
            buttonLabel="Open"
            onClick={() => navigate('/patient-form')}
            color="primary"
            cardHeight="220px"
            cardWidth="360px"
          />
        </Grid>

        <Grid item xs={12} md={4}>
          <CustomCard
            icon={<ListAltIcon color="secondary" />}
            title="Patient List"
            description="View and manage all patient list."
            buttonLabel="View List"
            onClick={() => navigate('/patients/list')}
            color="secondary"
            cardHeight="220px"
            cardWidth="360px"
          />
        </Grid>

        <Grid item xs={12} md={4}>
          <Card
            sx={{
              height: '190px',
              width: '360px',
              borderRadius: 5,
              boxShadow: '0 4px 18px rgba(0,0,0,0.12)',
              transition: 'transform 0.3s ease, box-shadow 0.3s ease',
              '&:hover': {
                transform: 'scale(1.02)',
                boxShadow: '4px 10px 24px rgba(0,0,0,0.15)',
              },
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              p: 2,
            }}
          >
            <CardContent sx={{ flexGrow: 1 }}>
              <Grid container spacing={3} sx={{ mt: 1 }}>
                <Grid item xs={12}>
                  <ImportantNotePR />
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Appointments */}
      <Typography variant="h5" fontWeight="medium" mb={2}>
        Today’s Appointments
      </Typography>
      <Paper elevation={3} sx={{ overflowX: 'auto', mb: 4 }}>
        <Table>
          <TableHead sx={{ backgroundColor: '#e3f2fd' }}>
            <TableRow>
              <TableCell><strong>Time</strong></TableCell>
              <TableCell><strong>Patient</strong></TableCell>
              <TableCell><strong>Department</strong></TableCell>
              <TableCell><strong>Note</strong></TableCell>
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

      {/* Recent Patients */}
      <Typography variant="h5" fontWeight="medium" mb={2}>
        Recent Patients
      </Typography>
      <Paper elevation={3} sx={{ overflowX: 'auto' }}>
        <Table>
          <TableHead sx={{ backgroundColor: '#e3f2fd' }}>
            <TableRow>
              <TableCell><strong>Name</strong></TableCell>
              <TableCell><strong>Age</strong></TableCell>
              <TableCell><strong>Phone</strong></TableCell>
              <TableCell><strong>Date</strong></TableCell>
              <TableCell><strong>Diagnosis</strong></TableCell>
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
    </Box>
  );
};

export default PatientRecords;
