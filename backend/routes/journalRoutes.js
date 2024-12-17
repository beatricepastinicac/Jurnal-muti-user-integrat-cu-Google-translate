const express = require('express');
const router = express.Router();
const journalController = require('../controllers/journalController');
const auth = require('../middleware/auth');

// Toate rutele necesită autentificare
router.use(auth);

// Rute pentru jurnal
router.post('/', journalController.create);
router.get('/', journalController.getAllEntries);
router.get('/:id', journalController.getEntry);
router.put('/:id', journalController.updateEntry);
router.delete('/:id', journalController.deleteEntry);

module.exports = router;