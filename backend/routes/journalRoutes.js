const express = require('express');
const router = express.Router();
const journalController = require('../controllers/journalController');
const auth = require('../middleware/auth');


router.use(auth);


router.post('/', journalController.create);
router.get('/', journalController.getAllEntries);
router.get('/:id', journalController.getEntry);
router.put('/:id', journalController.updateEntry);
router.delete('/:id', journalController.deleteEntry);

module.exports = router;