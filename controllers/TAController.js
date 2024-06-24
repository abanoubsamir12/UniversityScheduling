const TA = require('../models/TA'); // Adjust the path as necessary

// Create a new TA
async function createTA(req, res) {
    const { user, section } = req.body;

    try {
        const newTA = new TA({ user, section });
        await newTA.save();
        res.status(201).json(newTA);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

// Get all TAs
async function getTAs(req, res) {
    try {
        const tas = await TA.find().populate('user section');
        res.status(200).json(tas);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

// Get a specific TA by ID
async function getTAById(req, res) {
    const { id } = req.params;

    try {
        const ta = await TA.findById(id).populate('user section');
        if (!ta) {
            return res.status(404).json({ error: 'TA not found' });
        }
        res.status(200).json(ta);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

// Update a TA by ID
async function updateTA(req, res) {
    const { id } = req.params;
    const { user, section } = req.body;

    try {
        const updatedTA = await TA.findByIdAndUpdate(id, { user, section }, { new: true });
        if (!updatedTA) {
            return res.status(404).json({ error: 'TA not found' });
        }
        res.status(200).json(updatedTA);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

// Delete a TA by ID
async function deleteTA(req, res) {
    const { id } = req.params;

    try {
        const deletedTA = await TA.findByIdAndDelete(id);
        if (!deletedTA) {
            return res.status(404).json({ error: 'TA not found' });
        }
        res.status(200).json({ message: 'TA deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

module.exports = { createTA, getTAs, getTAById, updateTA, deleteTA };
