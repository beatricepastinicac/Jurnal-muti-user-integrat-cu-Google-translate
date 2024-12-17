const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const JournalEntry = sequelize.define('JournalEntry', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    title: {
        type: DataTypes.STRING(191),
        allowNull: false
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    originalLanguage: {
        type: DataTypes.STRING(10),
        defaultValue: 'ro'
    }
});

module.exports = JournalEntry;