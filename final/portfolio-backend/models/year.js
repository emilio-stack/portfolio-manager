const mongoose = require('mongoose');

const yearSchema = mongoose.Schema({
    year:       {  type: String, required: true },
    classes:    [],
    id:         {  type: String, required: true }
});
 
module.exports = mongoose.model('Year', yearSchema);