var express = require("express");
var router = express.Router();
let db = require("../models");

/* GET all budget listing. */
router.get("/", async (req, res, next) => {
  try {
    let allBudgets = await db.Budget.find();
    res.json({ budgets: allBudgets });
  } catch (err) {
    res.status(500).json(err);
  }
});

/* GET one budget listing. */
router.get("/:id", async (req, res, next) => {
  try {
    let budget = await db.Budget.findOne({ _id: req.params.id });
    res.json({ budget });
  } catch (err) {
    res.status(500).json(err);
  }
});

/* POST a new budget */
router.post("/", async (req, res, next) => {
  try {
    let newBudget = new db.Budget(req.body);

    newBudget.createdAt = new Date().toISOString();
    newBudget.updatedAt = new Date().toISOString();

    newBudget.status = "PENDING";

    const {
      user: { _id: userId, name: userName },
    } = req;

    newBudget.historical = [
      {
        type: "ENTITY_CREATION",
        description: "O orçamento foi cadastrado no sistema.",
        date: new Date().toISOString(),
        user: {
          id: userId,
          name: userName,
        },
      },
    ];

    let budget = await newBudget.save();

    res.json({ budget });
  } catch (err) {
    res.status(500).json(err);
  }
});

/* PUT an update to a budget */
router.put("/:id", async (req, res, next) => {
  try {
    let budgetId = req.params.id;
    let newData = req.body;
    newData.updatedAt = new Date();
    let updatedBudget = await db.Budget.findByIdAndUpdate(budgetId, newData);
    res.json(updatedBudget);
  } catch (err) {
    res.status(500).json(err);
  }
});

/* DELETE a budget. */
router.delete("/:id", async (req, res, next) => {
  try {
    let budgetId = req.params.id;
    let removedBudget = await db.Budget.findOneAndRemove({ _id: budgetId })
      .populate("Budget")
      .exec();
    res.json(removedBudget);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
