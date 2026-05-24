const express = require("express");

const router = express.Router();

const { PrismaClient } =
  require("@prisma/client");

const prisma = new PrismaClient();

const authMiddleware =
  require("../middleware/authMiddleware");


// CREATE BUDGET
router.post(
  "/",
  authMiddleware,
  async (req, res) => {

    try {

      const {
        amount,
        category,
        month,
      } = req.body;

      const budget =
        await prisma.budget.create({
          data: {
            amount: Number(amount),
            category,
            month,
            userId: req.user.id,
          },
        });

      res.json(budget);

    } catch (error) {

      console.log(error);

      res.status(500).json({
        message:
          "Failed to create budget",
      });

    }
  }
);


// GET BUDGETS
router.get(
  "/",
  authMiddleware,
  async (req, res) => {

    try {

      const budgets =
        await prisma.budget.findMany({
          where: {
            userId: req.user.id,
          },
        });

      res.json(budgets);

    } catch (error) {

      console.log(error);

      res.status(500).json({
        message:
          "Failed to fetch budgets",
      });

    }
  }
);

module.exports = router;