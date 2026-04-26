const express = require("express");
const router = express.Router();

let transactions = [];

router.get("/", (req, res) => {
  res.json(transactions);
});

router.post("/", (req, res) => {
  const { amount, category, type } = req.body;

  const newTransaction = {
    id: Date.now(),
    amount,
    category,
    type,
    date: new Date()
  };

  transactions.push(newTransaction);

  res.json(newTransaction);
});

router.delete("/:id", (req, res) => {
  const id = parseInt(req.params.id);

  transactions = transactions.filter(t => t.id !== id);

  res.json({ message: "Transaction deleted" });
});

module.exports = router;