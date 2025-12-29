const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  first_name: String,
  last_name: String,
  email: String,
  company_name: String
});

module.exports = mongoose.model('User', UserSchema);
