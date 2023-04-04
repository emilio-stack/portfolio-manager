var Sequence = require('../models/sequence');

var maxProjectId;
var maxTestimonialId;
var maxYearId;
var sequenceId = null;

function SequenceGenerator() {

  Sequence.findOne()
    .exec(function(err, sequence) {
      if (err) {
        return res.status(500).json({
          title: 'An error occurred',
          error: err
        });
      }

      sequenceId = sequence._id;
      maxProjectId = sequence.maxProjectId;
      maxTestimonialId = sequence.maxTestimonialId;
      maxYearId = sequence.maxYearId;
    });
}

SequenceGenerator.prototype.nextId = function(collectionType) {

  var updateObject = {};
  var nextId;

  switch (collectionType) {
    case 'projects':
      maxProjectId++;
      updateObject = {maxProjectId: maxProjectId};
      nextId = maxProjectId;
      break;
    case 'testimonials':
      maxTestimonialId++;
      updateObject = {maxTestimonialId: maxTestimonialId};
      nextId = maxTestimonialId;
      break;
    default:
      return -1;
  }

  Sequence.update({_id: sequenceId}, {$set: updateObject},
    function(err) {
      if (err) {
        console.log("nextId error = " + err);
        return null
      }
    });

  return nextId;
}

module.exports = new SequenceGenerator();