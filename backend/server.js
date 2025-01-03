const express = require('express');
const cors = require('cors');
require('dotenv').config(); // Încarcă variabilele de mediu
const sequelize = require('./config/db'); // Configurarea bazei de date
const userRoutes = require('./routes/userRoutes'); // Rutele pentru utilizatori
const journalRoutes = require('./routes/journalRoutes'); // Rutele pentru jurnal
const translateRoutes = require('./routes/translateRoutes'); // Rutele pentru traduceri
const auth = require('./middleware/auth');

// Importă modelele
const User = require('./models/User');
const JournalEntry = require('./models/JournalEntry');
const Logs = require('./models/Logs');

// Verifică conexiunea la baza de date
sequelize.authenticate()
  .then(() => console.log('Conexiune reușită la baza de date.'))
  .catch((error) => console.error('Eroare la conectarea bazei de date:', error));

// Asigură-te că modelele sunt sincronizate
sequelize.sync({ alter: true })
  .then(() => console.log('Modelele au fost sincronizate cu baza de date.'))
  .catch((error) => console.error('Eroare la sincronizarea modelelor:', error));

const app = express();

// Middleware-uri globale
app.use(cors());
app.use(express.json());

// Definire rute API
app.use('/api/users', userRoutes);
app.use('/api/journal', journalRoutes);
app.use('/api/translate', translateRoutes);

// Middleware pentru gestionarea erorilor
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    message: 'Ceva nu a mers bine!',
    error: process.env.NODE_ENV === 'development' ? err.message : {},
  });
});

// Pornire server
const PORT = process.env.PORT || 5000;
sequelize.sync({ alter: true }).then(() => {
  app.listen(PORT, () => {
    console.log(`Serverul rulează pe portul ${PORT}`);
  });
}).catch((error) => {
  console.error('Eroare la sincronizarea bazei de date:', error);
});
