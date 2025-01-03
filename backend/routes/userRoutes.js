const express = require('express') // importa express
const router = express.Router() // creeaza un router express
const userController = require('../controllers/userController') // importa controller-ul user
const auth = require('../middleware/auth') // middleware pt autentificare

// ruta pt inregistrare user nou
router.post('/register', userController.register) // handler pt creare user

// ruta pt autentificare user
router.post('/login', userController.login) // handler pt login user

// ruta pt obtinerea profilului user-ului curent
router.get('/profile', auth, userController.getProfile) // necesita autentificare

module.exports = router // exporta router-ul pt utilizare in server
