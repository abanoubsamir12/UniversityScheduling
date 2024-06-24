const express = require('express');
const router = express.Router();
const { createStudent, getStudents, getStudentById, updateStudent, deleteStudent } = require('../controllers/studentController');

// Create a new Student
router.post('/', createStudent);

// Get all Students
router.get('/', getStudents);

// Get a specific Student by ID
router.get('/:id', getStudentById);

// Update a Student by ID
router.put('/:id', updateStudent);

// Delete a Student by ID
router.delete('/:id', deleteStudent);

module.exports = router;
