const mongoose = require('mongoose');
const slugify = require('slugify');

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
 },
 slug: String,
});

// DOCUMENT MIDDLEWARE: runs before .save() and .create()
productSchema.pre('save', function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

module.exports = mongoose.model('user', userSchema);