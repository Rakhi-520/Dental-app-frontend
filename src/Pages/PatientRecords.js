import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Card,
  CardContent,
  Typography,
  Button,
  Grid,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  Box
} from '@mui/material';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import ListAltIcon from '@mui/icons-material/ListAlt';

// ✅ Reusable CustomCard Component
const CustomCard = ({
  icon,
  title,
  description,
  buttonLabel,
  onClick,
  color,
  cardHeight,
  cardWidth
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
  const [notes, setNotes] = useState('');

  useEffect(() => {
    const today = new Date().toISOString().slice(0, 10);

    setAppointments([
      { time: '10:00 AM', name: 'Amit Shah', dept: 'Ortho', note: 'Braces check' },
      { time: '11:30 AM', name: 'Sara Ali', dept: 'General', note: 'Tooth cleaning' }
    ]);

    setRecentPatients([
      { name: 'Ravi Kumar', age: 32, phone: '9999999999', date: today, diagnosis: 'Cavity' },
      { name: 'Anjali Menon', age: 25, phone: '8888888888', date: today, diagnosis: 'Root Canal' },
      { name: 'Suresh Raina', age: 40, phone: '7777777777', date: today, diagnosis: 'Scaling' }
    ]);
  }, []);

  return (
    <Box sx={{ padding: '30px' }}>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        Patient Records
      </Typography>

      {/* Cards Section with 3 Equal Cards in One Row */}
      <Grid container spacing={3} mb={4}>
        <Grid item xs={12} md={4}>
          <CustomCard
            icon={<NoteAddIcon color="primary" />}
            title="New Case Sheet"
            description="Start a new case sheet entry for a patient."
            buttonLabel="Open Form"
            onClick={() => navigate('/patient-form')}
            color="primary"
            cardHeight="220px"
            cardWidth="370px"
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
            cardWidth="370px"
          />
        </Grid>

        <Grid item xs={12} md={4}>
          <Card
            sx={{
              height: '220px',
              width: '370px',
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
              padding: `0,0,1,0`,
            }}
          >
            <CardContent sx={{ flexGrow:3}}>
              <Typography variant="h6" fontWeight={600} mb={1}>
                Important Notes
              </Typography>

              <textarea
                rows={6}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                style={{
                  width: '98%',
                  resize: 'none',
                  padding: '1px',
                  borderRadius: '4px',
                  border: '1px solid #ccc',
                  fontFamily: 'inherit',
                  fontSize: '0.9rem',
                }}
                placeholder="Type here..."
              />
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Today's Appointments */}
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
