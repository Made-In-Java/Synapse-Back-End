var express = require('express');
var router = express.Router();
let db = require('../models');

/* GET all Services listing. */
router.get('/', async (req, res, next) => {
    try {
        let allServices = await db.Service.find();
        res.json({ services: allServices });
    }
    catch (err) {
        res.status(500).json(err);
    }
});

/* GET one Service listing. */
router.get('/:id', async (req, res, next) => {
    try {
        let service = await db.Service.findOne({ _id: req.params.id });
        res.json({ serviceunctionality });
    }
    catch (err) {
        res.status(500).json(err);
    }
});

/* POST a new Service */
router.post('/', async (req, res, next) => {
    try {
        let newService = new db.Service(req.body);
        newService.createdAt = new Date();
        newService.save();
        res.json({ newService });
    }
    catch (err) {
        res.status(500).json(err);
    }
});

/* PUT update a Service listing. */
router.put('/:id', async (req, res, next) => {
    try {
        let serviceId = req.params.id;
        let newData = req.body;
        newData.updatedAt = new Date();
        let updatedService = await db.Service.findByIdAndUpdate(serviceId, newData);
        res.json(updatedService);
    }
    catch (err) {
        res.status(500).json(err);
    }
});

/* DELETE delete a Service listing. */
router.delete('/:id', async (req, res, next) => {
    try {
        let serviceId = req.params.id;
        let removedService = await db.Service.findOneAndRemove({ _id: serviceId }).populate('Service').exec();
        res.json(removedService);
    }
    catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;