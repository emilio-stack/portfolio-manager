const mongoose = require('mongoose');

const sequenceSchema = mongoose.Schema({
    maxProjectId:       { type: Number, required: true },
    maxTestimonialId:   { type: Number, required: true },
    maxYearId:          { type: Number, required: true }
});

module.exports = mongoose.model('Sequence', sequenceSchema);