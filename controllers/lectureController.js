const Lecture = require('../models/lecture');

// Controller for creating a new lecture
exports.createLecture = async (req, res) => {
  try {
    const newLecture = await Lecture.create(req.body);
    res.status(201).json(newLecture);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Controller for getting all lectures
exports.getAllLectures = async (req, res) => {
  try {
    const lectures = await Lecture.find().populate('room').populate('doctor').populate('subject').populate('schedule').populate('students');
    res.status(200).json(lectures);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Controller for getting a single lecture
exports.getLectureById = async (req, res) => {
  try {
    const lecture = await Lecture.findById(req.params.id).populate('room').populate('doctor').populate('subject').populate('schedule').populate('students');
    if (!lecture) {
      return res.status(404).json({ message: 'Lecture not found' });
    }
    res.status(200).json(lecture);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Controller for updating a lecture
exports.updateLecture = async (req, res) => {
  try {
    const updatedLecture = await Lecture.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedLecture) {
      return res.status(404).json({ message: 'Lecture not found' });
    }
    res.status(200).json(updatedLecture);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Controller for deleting a lecture
exports.deleteLecture = async (req, res) => {
  try {
    const deletedLecture = await Lecture.findByIdAndDelete(req.params.id);
    if (!deletedLecture) {
      return res.status(404).json({ message: 'Lecture not found' });
    }
    res.status(200).json({ message: 'Lecture deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};