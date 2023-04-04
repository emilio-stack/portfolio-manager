var express = require('express');
var router = express.Router();

const Year = require('../models/year');
const sequenceGenerator = require('./sequenceGenerator');

router.get('/', (req, res, next) => {
    Year.find().then(years => {
        res.status(200).json({
            message: "Year fetched successfully",
            data: years
        })
    }).catch(err => {
        res.status(500).json({
            message: "Year failed to fetch",
            error: err
        });
    });
});

router.post('/', (req, res, next) => {
    const maxTestimonialId = sequenceGenerator.nextId("classes");

    const year = new Year({
        year: req.body.year,
        classes: req.body.classes,
        id: maxTestimonialId
    });

    console.log(year)
  
    year.save()
      .then(createdYear => {
        res.status(201).json({
          message: 'Year added successfully',
          year: createdYear
        });
      })
      .catch(error => {
         res.status(500).json({
            message: 'An error occurred',
            error: error
          });
      });
  });

  router.put('/:id', (req, res, next) => {
    Year.findOne({ id: req.params.id })
      .then(year => {
        year.year = req.body.year;
        year.classes = req.body.classes;
  
        Year.updateOne({ id: req.params.id }, year)
          .then(result => {
            res.status(204).json({
              message: 'Year updated successfully'
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
          message: 'Year not found.',
          error: { year: 'Year not found'}
        });
      });
  });

  router.delete("/:id", (req, res, next) => {
    Year.findOne({ id: req.params.id })
      .then(year => {
        Year.deleteOne({ id: req.params.id })
          .then(result => {
            res.status(204).json({
              message: "Year deleted successfully"
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
          message: 'Year not found.',
          error: { year: 'Year not found'}
        });
      });
});

module.exports = router;