var express = require('express');
var router = express.Router();
let db = require('../models');

/* GET all Projects listing. */
router.get('/', async (req, res, next) => {
    try {
        let allProjects = await db.Project.find();
        res.json({ projects: allProjects });
    }
    catch (err) {
        res.status(500).json(err);
    }
});

/* GET one Project listing. */
router.get('/:id', async (req, res, next) => {
    try {
        let project = await db.Project.findOne({ _id: req.params.id });
        res.json({ project });
    }
    catch (err) {
        res.status(500).json(err);
    }
});

/* POST a new Project */
router.post('/', async (req, res, next) => {
    try {
        let newProject = new db.Project(req.body);
        newProject.createdAt = new Date();
        newProject.save();
        res.json({ newProject });
    }
    catch (err) {
        res.status(500).json(err);
    }
});

/* PUT update a Project listing. */
router.put('/:id', async (req, res, next) => {
    try {
        let projectId = req.params.id;
        let newData = req.body;
        newData.updatedAt = new Date();
        let updatedProject = await db.Project.findByIdAndUpdate(projectId, newData);
        res.json(updatedProject);
    }
    catch (err) {
        res.status(500).json(err);
    }
});

/* DELETE delete a Project listing. */
router.delete('/:id', async (req, res, next) => {
    try {
        let projectId = req.params.id;
        let removedProject = await db.Project.findOneAndRemove({ _id: projectId }).populate('Project').exec();
        res.json(removedProject);
    }
    catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;