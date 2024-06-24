const Doctor = require('../models/Doctor'); // Adjust the path as necessary

// Create a new Doctor
async function createDoctor(req, res) {
    const { user, center, subject, lecture } = req.body;

    try {
        const newDoctor = new Doctor({ user, center, subject, lecture });
        await newDoctor.save();
        res.status(201).json(newDoctor);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

// Get all Doctors
async function getDoctors(req, res) {
    try {
        const doctors = await Doctor.find().populate('user center subject lecture');
        res.status(200).json(doctors);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

// Get a specific Doctor by ID
async function getDoctorById(req, res) {
    const { id } = req.params;

    try {
        const doctor = await Doctor.findById(id).populate('user center subject lecture');
        if (!doctor) {
            return res.status(404).json({ error: 'Doctor not found' });
        }
        res.status(200).json(doctor);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

// Update a Doctor by ID
async function updateDoctor(req, res) {
    const { id } = req.params;
    const { user, center, subject, lecture } = req.body;

    try {
        const updatedDoctor = await Doctor.findByIdAndUpdate(id, { user, center, subject, lecture }, { new: true });
        if (!updatedDoctor) {
            return res.status(404).json({ error: 'Doctor not found' });
        }
        res.status(200).json(updatedDoctor);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

// Delete a Doctor by ID
async function deleteDoctor(req, res) {
    const { id } = req.params;

    try {
        const deletedDoctor = await Doctor.findByIdAndDelete(id);
        if (!deletedDoctor) {
            return res.status(404).json({ error: 'Doctor not found' });
        }
        res.status(200).json({ message: 'Doctor deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

module.exports = { createDoctor, getDoctors, getDoctorById, updateDoctor, deleteDoctor };
