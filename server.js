const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const sequelize=require('./config/db');
const User = require('./models/User');
const Note = require('./models/Note');

const app = express();
//middleware
app.use(bodyParser.json()); //=>json 
app.use(cors()); //permite cereri din alte domenii

//ruta de test
app.get('/', (req, res) => res.send('Servărul rulează corect!'));


// Sincronizarea db si pornire server 
sequelize.sync({ force: false })              // force: false = tine datele existente
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