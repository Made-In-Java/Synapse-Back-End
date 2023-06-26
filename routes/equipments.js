var express = require('express');
var router = express.Router();
let db = require('../models');

/* GET all Equipments listing. */
router.get('/', async (req, res, next) => {
    try {
        let allEquipments = await db.Equipment.find();
        res.json({ equipments: allEquipments });
    }
    catch (err) {
        res.status(500).json(err);
    }
});

/* GET one Equipment listing. */
router.get('/:id', async (req, res, next) => {
    try {
        let equipment = await db.Equipment.findOne({ _id: req.params.id });
        res.json({ equipment });
    }
    catch (err) {
        res.status(500).json(err);
    }
});

/* POST a new Equipment */
router.post('/', async (req, res, next) => {
    try {
        let newEquipment = new db.Equipment(req.body);
        newEquipment.createdAt = new Date();
        newEquipment.save();
        res.json({ newEquipment });
    }
    catch (err) {
        res.status(500).json(err);
    }
});

/* PUT update a Equipment listing. */
router.put('/:id', async (req, res, next) => {
    try {
        let equipmentId = req.params.id;
        let newData = req.body;
        newData.updatedAt = new Date();
        let updatedEquipment = await db.Equipment.findByIdAndUpdate(equipmentId, newData);
        res.json(updatedEquipment);
    }
    catch (err) {
        res.status(500).json(err);
    }
});

/* DELETE delete a Equipment listing. */
router.delete('/:id', async (req, res, next) => {
    try {
        let equipmentId = req.params.id;
        let removedEquipment = await db.Equipment.findOneAndRemove({ _id: equipmentId }).populate('Equipment').exec();
        res.json(removedEquipment);
    }
    catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;