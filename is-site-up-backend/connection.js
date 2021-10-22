const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/IsSiteUp');

module.exports = { mongoose };