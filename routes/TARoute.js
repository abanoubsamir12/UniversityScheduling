const express = require('express');
const router = express.Router();
const { createTA, getTAs, getTAById, updateTA, deleteTA } = require('../controllers/TAController');

// Create a new TA
router.post('/', createTA);

// Get all TAs
router.get('/', getTAs);

// Get a specific TA by ID
router.get('/:id', getTAById);

// Update a TA by ID
router.put('/:id', updateTA);

// Delete a TA by ID
router.delete('/:id', deleteTA);

module.exports = router;
