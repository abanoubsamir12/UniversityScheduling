const Center = require('../models/center');

// Controller for creating a new center
exports.createCenter = async (req, res) => {
  try {
    const newCenter = await Center.create(req.body);
    res.status(201).json(newCenter);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Controller for getting all centers
exports.getAllCenters = async (req, res) => {
  try {
    const centers = await Center.find().populate('rooms').populate('colleges').populate('doctor');
    res.status(200).json(centers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Controller for getting a single center
exports.getCenterById = async (req, res) => {
  try {
    const center = await Center.findById(req.params.id).populate('rooms').populate('colleges').populate('doctor');
    if (!center) {
      return res.status(404).json({ message: 'Center not found' });
    }
    res.status(200).json(center);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Controller for updating a center
exports.updateCenter = async (req, res) => {
  try {
    const updatedCenter = await Center.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedCenter) {
      return res.status(404).json({ message: 'Center not found' });
    }
    res.status(200).json(updatedCenter);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Controller for deleting a center
exports.deleteCenter = async (req, res) => {
  try {
    const deletedCenter = await Center.findByIdAndDelete(req.params.id);
    if (!deletedCenter) {
      return res.status(404).json({ message: 'Center not found' });
    }
    res.status(200).json({ message: 'Center deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};