const express = require('express');
const router = express.Router();
const { createDoctor, getDoctors, getDoctorById, updateDoctor, deleteDoctor } = require('../controllers/doctorController');

// Create a new Doctor
router.post('/', createDoctor);

// Get all Doctors
router.get('/', getDoctors);

// Get a specific Doctor by ID
router.get('/:id', getDoctorById);

// Update a Doctor by ID
router.put('/:id', updateDoctor);

// Delete a Doctor by ID
router.delete('/:id', deleteDoctor);

module.exports = router;
