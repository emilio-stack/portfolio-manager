const mongoose = require('mongoose');

const testimonialSchema = mongoose.Schema({
    quality:        {  type: String, required: true },
    text:           {  type: String, required: true },
    person:         {  type: String, required: true },
    credentials:    {  type: String                 },
    id:             {  type: String, required: true }
});
 
module.exports = mongoose.model('Testimonial', testimonialSchema);