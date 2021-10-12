const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
   fullName: {
   type: String,
   required: [true, 'A user must have a full name'],
 },
 password: {
   type: String,
   required: [true, 'A user must have a password'],
 },
 email: {
   type: String,
   required: [true, 'A user must have an email'],
 }, 
 telefon: {
   type: Number, 
   required: [true, 'A user must have a telefon'],
 },
 adress: {
   type: String,
   required: [true, 'A user must have an adress'],
 }
});

module.exports = mongoose.model('user', userSchema);