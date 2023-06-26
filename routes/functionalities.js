var express = require('express');
var router = express.Router();
let db = require('../models');

/* GET all Functionalities listing. */
router.get('/', async (req, res, next) => {
    try {
        let allFunctionalities = await db.Functionality.find();
        res.json({ functionalities: allFunctionalities });
    }
    catch (err) {
        res.status(500).json(err);
    }
});

/* GET one Functionality listing. */
router.get('/:id', async (req, res, next) => {
    try {
        let functionality = await db.Functionality.findOne({ _id: req.params.id });
        res.json({ functionality });
    }
    catch (err) {
        res.status(500).json(err);
    }
});

/* POST a new Functionality */
router.post('/', async (req, res, next) => {
    try {
        let newFunctionality = new db.Functionality(req.body);
        newFunctionality.createdAt = new Date();
        newFunctionality.save();
        res.json({ newFunctionality });
    }
    catch (err) {
        res.status(500).json(err);
    }
});

/* PUT update a Functionality listing. */
router.put('/:id', async (req, res, next) => {
    try {
        let functionalityId = req.params.id;
        let newData = req.body;
        newData.updatedAt = new Date();
        let updatedFunctionality = await db.Functionality.findByIdAndUpdate(functionalityId, newData);
        res.json(updatedFunctionality);
    }
    catch (err) {
        res.status(500).json(err);
    }
});

/* DELETE delete a Functionality listing. */
router.delete('/:id', async (req, res, next) => {
    try {
        let functionalityId = req.params.id;
        let removedFunctionality = await db.Functionality.findOneAndRemove({ _id: functionalityId }).populate('Functionality').exec();
        res.json(removedFunctionality);
    }
    catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;