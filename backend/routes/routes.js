const express = require('express') // importa express
const jwt = require('jsonwebtoken') // importa jwt pt gestionarea token-urilor
const bcrypt = require('bcryptjs') // importa bcrypt pt hashing parola
const User = require('./User') // modelul user
const Note = require('./Note') // modelul note

const router = express.Router() // creeaza un router express

// middleware pt autentificare
const authenticate = (req, res, next) => {
  const token = req.header('Authorization') // preia token-ul din header
  if (!token) {
    return res.status(401).json({ error: 'acces interzis. token lipsa.' }) // token absent
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET) // verifica token-ul
    req.userId = decoded.id // adauga userId la req
    next() // trece la urmatorul middleware
  } catch (error) {
    res.status(401).json({ error: 'token invalid.' }) // token invalid
  }
}

// **crud pt user**
router.post('/users', async (req, res) => {
  const { username, password } = req.body // preia datele din req

  if (!username || !password) {
    return res.status(400).json({ error: 'nume utilizator si parola sunt obligatorii.' })
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10) // hash parola
    const user = await User.create({ username, password: hashedPassword }) // creaza user
    res.status(201).json(user) // returneaza user-ul creat
  } catch (error) {
    res.status(400).json({ error: 'eroare la crearea utilizatorului: ' + error.message })
  }
})

router.get('/users', authenticate, async (req, res) => {
  try {
    const users = await User.findAll() // preia toti userii
    res.json(users) // returneaza lista de useri
  } catch (error) {
    res.status(500).json({ error: 'eroare la preluarea utilizatorilor.' })
  }
})

// login si autentificare
router.post('/login', async (req, res) => {
  const { username, password } = req.body // preia datele din req

  if (!username || !password) {
    return res.status(400).json({ error: 'nume utilizator si parola sunt obligatorii.' })
  }

  try {
    const user = await User.findOne({ where: { username } }) // cauta user dupa username
    if (!user) return res.status(404).json({ error: 'utilizatorul nu a fost gasit.' })

    const isMatch = await bcrypt.compare(password, user.password) // verifica parola
    if (!isMatch) return res.status(401).json({ error: 'parola incorecta.' })

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' }) // genereaza token
    res.json({ token }) // returneaza token-ul
  } catch (error) {
    res.status(500).json({ error: 'eroare la autentificare: ' + error.message })
  }
})

// crud pt note
router.post('/notes', authenticate, async (req, res) => {
  const { content, userId } = req.body // preia datele din req

  if (!content || !userId) {
    return res.status(400).json({ error: 'continutul notei si id-ul utilizatorului sunt obligatorii.' })
  }

  try {
    const note = await Note.create({ content, userId }) // creaza nota
    res.status(201).json(note) // returneaza nota creata
  } catch (error) {
    res.status(400).json({ error: 'eroare la crearea notei: ' + error.message })
  }
})

router.get('/notes', authenticate, async (req, res) => {
  try {
    const notes = await Note.findAll() // preia toate notele
    res.json(notes) // returneaza lista de note
  } catch (error) {
    res.status(500).json({ error: 'eroare la preluarea notelor.' })
  }
})

// exporta router-ul pt utilizare in server.js
module.exports = router
