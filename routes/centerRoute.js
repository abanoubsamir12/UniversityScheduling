const express = require('express');
const router = express.Router();
const centerController = require('../controllers/centerController');

// Routes for center CRUD operations
router.post('/', centerController.createCenter);
router.get('/', centerController.getAllCenters);
router.get('/:id', centerController.getCenterById);
router.put('/:id', centerController.updateCenter);
router.delete('/:id', centerController.deleteCenter);

module.exports = router;