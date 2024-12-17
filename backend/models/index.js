const User = require('./User');
const JournalEntry = require('./JournalEntry');

// Definirea relațiilor
User.hasMany(JournalEntry);
JournalEntry.belongsTo(User);

module.exports = {
  User,
  JournalEntry
};