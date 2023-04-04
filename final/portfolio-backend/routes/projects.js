var express = require('express');
var router = express.Router();

const Project = require('../models/project');
const sequenceGenerator = require('./sequenceGenerator');

/************************************************
 * GET PROJECTS
 ************************************************/
router.get('/', (req, res, next) => {
    Project.find().then(projects => {
        res.status(200).json({
            message: "Projects fetched successfully",
            data: projects
        })
    }).catch(err => {
        res.status(500).json({
            message: "Projects failed to fetch",
            error: err
        });
    });
});

/***********************************************
 * POST PROJECTS
 **********************************************/
router.post('/', (req, res, next) => {
    const maxProjectId = sequenceGenerator.nextId("projects");

    const project = new Project({
      title: req.body.title,
      description: req.body.description,
      image: req.body.image,
      tags: req.body.tags,
      source: req.body.source,
      demo: req.body.demo,
      id: maxProjectId
    });
  
    project.save()
      .then(createdProject => {
        res.status(201).json({
          message: 'Project added successfully',
          project: createdProject
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
 * PUT PROJECTS
 *******************************************/
router.put('/:id', (req, res, next) => {
  Project.findOne({ id: req.params.id })
    .then(project => {
      project.title = req.body.title;
      project.description = req.body.description;
      project.image = req.body.image;
      project.tags = req.body.tags;
      project.source = req.body.source;
      project.demo = req.body.demo;

      Project.updateOne({ id: req.params.id }, project)
        .then(result => {
          res.status(204).json({
            message: 'Project updated successfully'
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
        message: 'Project not found.',
        error: { project: 'Project not found'}
      });
    });
});

/********************************************
 * DELETE PROJECTS
 ********************************************/
router.delete("/:id", (req, res, next) => {
    Project.findOne({ id: req.params.id })
      .then(project => {
        Project.deleteOne({ id: req.params.id })
          .then(result => {
            res.status(204).json({
              message: "Project deleted successfully"
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
          message: 'Project not found.',
          error: { project: 'Project not found'}
        });
      });
});

module.exports = router;