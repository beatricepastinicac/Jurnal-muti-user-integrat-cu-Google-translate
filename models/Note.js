const { DataTypes } = require('sequelize');
const sequelize=require('../config/db');
const User = require('./User');

const Note=sequelize.define('Note', {
    content: { type: DataTypes.TEXT, allowNull: false },
    language: { type: DataTypes.STRING, defaultValue: 'en' },
  });

  //relatii
  User.hasMany(Note, {
    onDelete: 'CASCADE',
    
  });
  Note.belongsTo(User);

  module.exports = Note;