const User = require('./User'); // Importă modelul User
const JournalEntry = require('./JournalEntry'); // Importă modelul JournalEntry
const Logs = require('./Logs'); // Importă modelul Logs

// Relatia User -> JournalEntry
User.hasMany(JournalEntry, { foreignKey: 'UserId', as: 'entries' });
JournalEntry.belongsTo(User, { foreignKey: 'UserId', as: 'user' });

// Relatia JournalEntry -> Logs
JournalEntry.hasMany(Logs, { foreignKey: 'JournalEntryId', as: 'logs' });
Logs.belongsTo(JournalEntry, { foreignKey: 'JournalEntryId', as: 'entry' });

module.exports = {
  User,
  JournalEntry,
  Logs,
};
