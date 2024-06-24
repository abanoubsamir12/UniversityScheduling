const Student = require('../models/Student'); // Adjust the path as necessary

// Create a new Student
async function createStudent(req, res) {
    const { user, studentID, lecture, level, subjects } = req.body;

    try {
        const newStudent = new Student({ user, studentID, lecture, level, subjects });
        await newStudent.save();
        res.status(201).json(newStudent);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

// Get all Students
async function getStudents(req, res) {
    try {
        const students = await Student.find().populate('user lecture level subjects');
        res.status(200).json(students);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

// Get a specific Student by ID
async function getStudentById(req, res) {
    const { id } = req.params;

    try {
        const student = await Student.findById(id).populate('user lecture level subjects');
        if (!student) {
            return res.status(404).json({ error: 'Student not found' });
        }
        res.status(200).json(student);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

// Update a Student by ID
async function updateStudent(req, res) {
    const { id } = req.params;
    const { user, studentID, lecture, level, subjects } = req.body;

    try {
        const updatedStudent = await Student.findByIdAndUpdate(id, { user, studentID, lecture, level, subjects }, { new: true });
        if (!updatedStudent) {
            return res.status(404).json({ error: 'Student not found' });
        }
        res.status(200).json(updatedStudent);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

// Delete a Student by ID
async function deleteStudent(req, res) {
    const { id } = req.params;

    try {
        const deletedStudent = await Student.findByIdAndDelete(id);
        if (!deletedStudent) {
            return res.status(404).json({ error: 'Student not found' });
        }
        res.status(200).json({ message: 'Student deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

module.exports = { createStudent, getStudents, getStudentById, updateStudent, deleteStudent };
