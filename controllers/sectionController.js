const Section = require('../models/section');

// Controller for creating a new section
exports.createSection = async (req, res) => {
  try {
    const newSection = await Section.create(req.body);
    res.status(201).json(newSection);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Controller for getting all sections
exports.getAllSections = async (req, res) => {
  try {
    const sections = await Section.find().populate('subject').populate('schedule').populate('room').populate('TA');
    res.status(200).json(sections);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Controller for getting a single section
exports.getSectionById = async (req, res) => {
  try {
    const section = await Section.findById(req.params.id).populate('subject').populate('schedule').populate('room').populate('TA');
    if (!section) {
      return res.status(404).json({ message: 'Section not found' });
    }
    res.status(200).json(section);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Controller for updating a section
exports.updateSection = async (req, res) => {
  try {
    const updatedSection = await Section.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedSection) {
      return res.status(404).json({ message: 'Section not found' });
    }
    res.status(200).json(updatedSection);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Controller for deleting a section
exports.deleteSection = async (req, res) => {
  try {
    const deletedSection = await Section.findByIdAndDelete(req.params.id);
    if (!deletedSection) {
      return res.status(404).json({ message: 'Section not found' });
    }
    res.status(200).json({ message: 'Section deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};