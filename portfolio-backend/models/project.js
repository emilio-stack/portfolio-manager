const mongoose = require('mongoose');

const projectSchema = mongoose.Schema({
    title:       {  type: String, required: true },
    description: {  type: String, required: true },
    image:       {  type: String, required: true },
    tags:        [{ type: String                }],
    source:      {  type: String                 },
    demo:        {  type: String                 },
    id:          {  type: String, required: true },
 });
 
 module.exports = mongoose.model('Project', projectSchema);