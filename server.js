const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const sequelize = require('./config/db');
const routes = require('./routes/routes'); // Importă rutele

const app = express();

// Middleware
app.use(bodyParser.json()); // Transformă request-urile în format JSON
app.use(cors()); // Permite cereri din alte domenii

// Ruta de test
app.get('/', (req, res) => res.send('Servărul rulează corect!'));

// Adaugă rutele definite
app.use('/api', routes); // Prefix pentru toate rutele din routes.js

// Sincronizarea db și pornirea serverului
sequelize.sync({ force: false }) // force: false păstrează datele existente
  .then(() => {
    console.log('Modelele au fost sincronizate cu baza de date.');

    const PORT = 3010;
    app.listen(PORT, () => {
      console.log(`Serverul rulează pe portul ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Eroare la sincronizarea cu baza de date:', err);
  });
