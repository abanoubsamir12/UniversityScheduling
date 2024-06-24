const Level = require('../models/level');

// Controller for creating a new level
exports.createLevel = async (req, res) => {
  try {
    const newLevel = await Level.create(req.body);
    res.status(201).json(newLevel);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Controller for getting all levels
exports.getAllLevels = async (req, res) => {
  try {
    const levels = await Level.find().populate('college').populate('students').populate('subjects');
    res.status(200).json(levels);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Controller for getting a single level
exports.getLevelById = async (req, res) => {
  try {
    const level = await Level.findById(req.params.id).populate('college').populate('students').populate('subjects');
    if (!level) {
      return res.status(404).json({ message: 'Level not found' });
    }
    res.status(200).json(level);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Controller for updating a level
exports.updateLevel = async (req, res) => {
  try {
    const updatedLevel = await Level.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedLevel) {
      return res.status(404).json({ message: 'Level not found' });
    }
    res.status(200).json(updatedLevel);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Controller for deleting a level
exports.deleteLevel = async (req, res) => {
  try {
    const deletedLevel = await Level.findByIdAndDelete(req.params.id);
    if (!deletedLevel) {
      return res.status(404).json({ message: 'Level not found' });
    }
    res.status(200).json({ message: 'Level deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};