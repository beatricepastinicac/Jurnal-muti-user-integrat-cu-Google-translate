const { Sequelize} = require('sequelize');
const mysql = require('mysql2/promise');
require('dotenv').config();

//creare conexiune db
(async () => {
    try {
        // conexiune temporara pentru a verifica baza de date
        const connection = await mysql.createConnection({
          host: process.env.DB_HOST,
          user: process.env.DB_USER,
          password: process.env.DB_PASS,
        });
    
        // crearea bazei de date daca aceasta nu exista 
        await connection.query(`CREATE DATABASE IF NOT EXISTS ${process.env.DB_NAME};`);
        console.log(`Baza de date "${process.env.DB_NAME}" a fost creată sau există deja.`);
        connection.end();
      } catch (error) {
        console.error('Eroare la crearea bazei de date:', error);
      }
    })();

//creare interfata Sequelize pentru gestionarea conexiunii
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
    host: process.env.DB_HOST, 
    dialect:   'mysql',
    port: process.env.DB_PORT,
    logging: false, //folosit pt a dezactiva logarea interogrilor SQL 
});

//verificare conexiune
sequelize
.authenticate()
    .then(() => 
        console.log('Conexiune reusita la baza de date'))
        .catch((err) => 
        console.log('Eroare la conectarea la baza de date: ', err));
   
        module.exports = sequelize;