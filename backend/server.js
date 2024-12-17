const express = require('express');
const cors = require('cors');
require('dotenv').config();
const sequelize = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const journalRoutes = require('./routes/journalRoutes');

const app = express();


app.use(cors());
app.use(express.json());


app.use('/api/users', userRoutes);
app.use('/api/journal', journalRoutes);


app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ 
        message: 'Ceva nu a mers bine!',
        error: process.env.NODE_ENV === 'development' ? err.message : {}
    });
});

const PORT = process.env.PORT || 5000;


sequelize.sync({ alter: true }).then(() => {
    app.listen(PORT, () => {
        console.log(`Serverul rulează pe portul ${PORT}`);
    });
}).catch(error => {
    console.error('Eroare la sincronizarea bazei de date:', error);
});