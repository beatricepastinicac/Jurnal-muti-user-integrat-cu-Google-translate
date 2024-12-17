const { Sequelize } = require('sequelize');
const mysql = require('mysql2/promise');
require('dotenv').config();

// Configurare opțiuni Sequelize
const sequelizeConfig = {
    host: process.env.DB_HOST,
    dialect: 'mysql',
    port: process.env.DB_PORT || 3306,
    logging: false,
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
    define: {
        charset: 'utf8mb4',
        collate: 'utf8mb4_unicode_ci',
        timestamps: true
    }
};

// Creare conexiune db
(async () => {
    try {
        // Conexiune temporară pentru a verifica baza de date
        const connection = await mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASS,
            charset: 'utf8mb4'
        });

        // Crearea bazei de date dacă aceasta nu există
        await connection.query(`
            CREATE DATABASE IF NOT EXISTS \`${process.env.DB_NAME}\`
            CHARACTER SET utf8mb4 
            COLLATE utf8mb4_unicode_ci
        `);
        console.log(`Baza de date "${process.env.DB_NAME}" a fost creată sau există deja.`);
        await connection.end();
    } catch (error) {
        console.error('Eroare la crearea bazei de date:', error);
    }
})();

// Creare instanță Sequelize
const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASS,
    sequelizeConfig
);

// Verificare conexiune cu gestionare erori mai detaliată
(async () => {
    try {
        await sequelize.authenticate();
        console.log('Conexiune reușită la baza de date');
    } catch (error) {
        console.error('Eroare la conectarea la baza de date:', error.message);
    }
})();

module.exports = sequelize;