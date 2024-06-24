const Subject = require('../models/subject');

// Controller for creating a new subject
exports.createSubject = async (req, res) => {
  try {
    const newSubject = await Subject.create(req.body);
    res.status(201).json(newSubject);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


exports.createSubjectsBulk = async (req, res) => {
  const subjectsData = req.body.subjects;

  // Validate each subject
  const validationErrors = [];
  const validSubjects = [];

  subjectsData.forEach((subjectData, index) => {
    const subject = new Subject(subjectData);
    const error = subject.validateSync();
    if (error) {
      validationErrors.push({ index, message: error.message });
    } else {
      validSubjects.push(subjectData);
    }
  });

  if (validationErrors.length > 0) {
    return res.status(400).json({ validationErrors });
  }

  try {
    const newSubjects = await Subject.insertMany(validSubjects);
    res.status(201).json(newSubjects);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
// Controller for getting all subjects
exports.getAllSubjects = async (req, res) => {
  try {
    const subjects = await Subject.find();
    res.status(200).json(subjects);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Controller for getting a single subject
exports.getSubjectById = async (req, res) => {
  try {
    const subject = await Subject.findById(req.params.id);
    if (!subject) {
      return res.status(404).json({ message: 'Subject not found' });
    }
    res.status(200).json(subject);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Controller for updating a subject
exports.updateSubject = async (req, res) => {
  try {
    const updatedSubject = await Subject.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedSubject) {
      return res.status(404).json({ message: 'Subject not found' });
    }
    res.status(200).json(updatedSubject);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Controller for deleting a subject
exports.deleteSubject = async (req, res) => {
  try {
    const deletedSubject = await Subject.findByIdAndDelete(req.params.id);
    if (!deletedSubject) {
      return res.status(404).json({ message: 'Subject not found' });
    }
    res.status(200).json({ message: 'Subject deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};