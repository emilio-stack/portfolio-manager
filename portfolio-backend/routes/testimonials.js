var express = require('express');
var router = express.Router();

const Testimonial = require('../models/testimonial');
const sequenceGenerator = require('./sequenceGenerator');

/************************************************
 * GET TESTIMONIALS
 ************************************************/
router.get('/', (req, res, next) => {
    Testimonial.find().then(Testimonials => {
        res.status(200).json({
            message: "Testimonials fetched successfully",
            data: Testimonials
        })
    }).catch(err => {
        res.status(500).json({
            message: "Testimonials failed to fetch",
            error: err
        });
    });
});

/***********************************************
 * POST TESTIMONIALS
 **********************************************/
router.post('/', (req, res, next) => {
    const maxTestimonialId = sequenceGenerator.nextId("testimonials");

    const testimonial = new Testimonial({
        quality: req.body.quality,
        text: req.body.text,
        person: req.body.person,
        credentials: req.body.credentials,
        id: maxTestimonialId
    });
  
    testimonial.save()
      .then(createdTestimonial => {
        res.status(201).json({
          message: 'Testimonial added successfully',
          testimonial: createdTestimonial
        });
      })
      .catch(error => {
         res.status(500).json({
            message: 'An error occurred',
            error: error
          });
      });
  });

/********************************************
 * PUT TESTIMONIALS
 *******************************************/
router.put('/:id', (req, res, next) => {
  Testimonial.findOne({ id: req.params.id })
    .then(testimonial => {
      testimonial.quality = req.body.quality;
      testimonial.text = req.body.text;
      testimonial.person = req.body.person;
      testimonial.credentials = req.body.credentials;

      Testimonial.updateOne({ id: req.params.id }, testimonial)
        .then(result => {
          res.status(204).json({
            message: 'Testimonial updated successfully'
          })
        })
        .catch(error => {
           res.status(500).json({
           message: 'An error occurred',
           error: error
         });
        });
    })
    .catch(error => {
      res.status(500).json({
        message: 'Testimonial not found.',
        error: { testimonial: 'Testimonial not found'}
      });
    });
});

/********************************************
 * DELETE TESTIMONIAL
 ********************************************/
router.delete("/:id", (req, res, next) => {
    Testimonial.findOne({ id: req.params.id })
      .then(testimonial => {
        Testimonial.deleteOne({ id: req.params.id })
          .then(result => {
            res.status(204).json({
              message: "Testimonial deleted successfully"
            });
          })
          .catch(error => {
             res.status(500).json({
             message: 'An error occurred',
             error: error
           });
          })
      })
      .catch(error => {
        res.status(500).json({
          message: 'Testimonial not found.',
          error: { testimonial: 'Testimonial not found'}
        });
      });
});

module.exports = router;