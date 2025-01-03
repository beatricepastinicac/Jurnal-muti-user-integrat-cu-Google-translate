const { Sequelize } = require('sequelize') // importa sequelize pt orm
const mysql = require('mysql2/promise') // importa mysql2 pt conex db
require('dotenv').config() // incarca variabilele din .env

// config sequelize - setari pt conectarea la db
const sequelizeConfig = {
    host: process.env.DB_HOST, // host-ul bazei de date
    dialect: 'mysql', // tipul bazei de date (mysql)
    port: process.env.DB_PORT || 3306, // port default 3306
    logging: false, // dezactiveaza logurile
    pool: {
        max: 5, // nr max conexiuni
        min: 0, // nr min conexiuni
        acquire: 30000, // timeout la obtinere conexiune (ms)
        idle: 10000 // timeout pt conexiuni idle (ms)
    },
    define: {
        charset: 'utf8mb4', // charset pt suport emoji
        collate: 'utf8mb4_unicode_ci', // collation unicode
        timestamps: true // adauga campuri createdAt si updatedAt
    }
}

// creare baza de date daca nu exista
;(async () => {
    try {
        const connection = await mysql.createConnection({
            host: process.env.DB_HOST, // host-ul bazei de date
            user: process.env.DB_USER, // utilizator db
            password: process.env.DB_PASS, // parola db
            charset: 'utf8mb4' // charset pt suport extins
        })

        // query pt creare baza de date
        await connection.query(`
            create database if not exists \`${process.env.DB_NAME}\`
            character set utf8mb4 
            collate utf8mb4_unicode_ci
        `)
        console.log(`baza de date "${process.env.DB_NAME}" a fost creata sau exista deja.`)
        await connection.end() // inchide conexiunea
    } catch (error) {
        console.error('eroare la crearea bazei de date:', error)
    }
})()

// initializare sequelize
const sequelize = new Sequelize(
    process.env.DB_NAME, // nume baza de date
    process.env.DB_USER, // utilizator
    process.env.DB_PASS, // parola
    sequelizeConfig // setari de conectare
)

// test conexiune sequelize
;(async () => {
    try {
        await sequelize.authenticate() // verifica conectarea
        console.log('conexiune reusita la baza de date')
    } catch (error) {
        console.error('eroare la conectarea la baza de date:', error.message)
    }
})()

module.exports = sequelize // exporta instanta pt folosire in alte module
