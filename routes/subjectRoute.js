const express = require('express');
const router = express.Router();
const subjectController = require('../controllers/subjectController');

// Routes for subject CRUD operations
router.post('/', subjectController.createSubject);
router.post('/bulk', subjectController.createSubjectsBulk);
router.get('/', subjectController.getAllSubjects);
router.get('/:id', subjectController.getSubjectById);
router.put('/:id', subjectController.updateSubject);
router.delete('/:id', subjectController.deleteSubject);

module.exports = router;