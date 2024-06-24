const College = require('../models/college');

// Controller for creating a new college
exports.createCollege = async (req, res) => {
  try {
    const newCollege = await College.create(req.body);
    res.status(201).json(newCollege);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Controller for getting all colleges
exports.getAllColleges = async (req, res) => {
  try {
    const colleges = await College.find().populate('centers').populate('levels');
    res.status(200).json(colleges);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Controller for getting a single college
exports.getCollegeById = async (req, res) => {
  try {
    const college = await College.findById(req.params.id).populate('centers').populate('levels');
    if (!college) {
      return res.status(404).json({ message: 'College not found' });
    }
    res.status(200).json(college);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Controller for updating a college
exports.updateCollege = async (req, res) => {
  try {
    const updatedCollege = await College.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedCollege) {
      return res.status(404).json({ message: 'College not found' });
    }
    res.status(200).json(updatedCollege);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Controller for deleting a college
exports.deleteCollege = async (req, res) => {
  try {
    const deletedCollege = await College.findByIdAndDelete(req.params.id);
    if (!deletedCollege) {
      return res.status(404).json({ message: 'College not found' });
    }
    res.status(200).json({ message: 'College deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};