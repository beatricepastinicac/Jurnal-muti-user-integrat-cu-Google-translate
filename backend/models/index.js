const User = require('./User');
const JournalEntry = require('./JournalEntry');


User.hasMany(JournalEntry);
JournalEntry.belongsTo(User);

module.exports = {
  User,
  JournalEntry
};