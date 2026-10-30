/**
 * Feature: 01-auth
 * Backend Authentication Router & Controller
 */

const express = require('express');
const router = express.Router();

// In-memory registered user repository for demo purposes
const users = [
  {
    username: 'patient',
    password: 'CareBridge123',
    fullName: 'Suresh',
    patientId: 'CB-DEMO-001',
    age: 55,
    gender: 'Male',
    phone: '9876543210'
  }
];

// POST /api/login
router.post('/login', (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({
      success: false,
      message: 'Username and password are required.'
    });
  }

  const user = users.find(
    u => u.username.toLowerCase() === username.trim().toLowerCase() && u.password === password
  );

  if (user) {
    return res.status(200).json({
      success: true,
      message: 'Authentication successful.',
      user: {
        username: user.username,
        name: user.fullName,
        patientId: user.patientId,
        age: user.age,
        gender: user.gender,
        role: 'patient'
      }
    });
  }

  return res.status(401).json({
    success: false,
    message: 'Invalid credentials. Use demo account (patient / CareBridge123) or register a new patient account.'
  });
});

// POST /api/register
router.post('/register', (req, res) => {
  const { username, password, fullName, age, gender, phone } = req.body;

  if (!username || !password || !fullName) {
    return res.status(400).json({
      success: false,
      message: 'Full Name, Username, and Password are required.'
    });
  }

  const existing = users.find(
    u => u.username.toLowerCase() === username.trim().toLowerCase()
  );

  if (existing) {
    return res.status(409).json({
      success: false,
      message: 'This username is already taken. Please choose another one.'
    });
  }

  const randomNum = Math.floor(100 + Math.random() * 900);
  const newPatientId = `CB-REG-${randomNum}`;

  const newUser = {
    username: username.trim(),
    password: password,
    fullName: fullName.trim(),
    patientId: newPatientId,
    age: age ? parseInt(age, 10) : 45,
    gender: gender || 'Not Specified',
    phone: phone || ''
  };

  users.push(newUser);

  return res.status(201).json({
    success: true,
    message: `Account created successfully! Welcome, ${newUser.fullName}.`,
    user: {
      username: newUser.username,
      name: newUser.fullName,
      patientId: newUser.patientId,
      age: newUser.age,
      gender: newUser.gender,
      role: 'patient'
    }
  });
});

module.exports = router;
