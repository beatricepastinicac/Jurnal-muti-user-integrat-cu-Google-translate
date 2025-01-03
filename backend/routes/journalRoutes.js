const express = require('express') // importa express
const router = express.Router() // creeaza un router express
const journalController = require('../controllers/journalController') // importa controller-ul jurnal
const auth = require('../middleware/auth') // importa middleware-ul de autentificare

// aplica middleware-ul de autentificare pt toate rutele
router.use(auth)

// rute pt operatii jurnal
router.post('/', journalController.create) // creare intrare jurnal
router.get('/', journalController.getAllEntries) // obtinere toate intrarile jurnal
router.get('/:id', journalController.getEntry) // obtinere intrare dupa id
router.put('/:id', journalController.updateEntry) // actualizare intrare dupa id
router.delete('/:id', journalController.deleteEntry) // stergere intrare dupa id

module.exports = router // exporta router-ul pt utilizare in server
