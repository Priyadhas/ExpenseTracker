const express = require('express');
const { createExpense, getAllExpenses, getExpenseById, updateExpense, deleteExpense } = require('../controllers/expenseController');
 const { validateExpense } = require('../middleware/validationMiddleware');

const router = express.Router();

router.post('/create',validateExpense, createExpense);
router.get('/', getAllExpenses);
router.get('/:id', getExpenseById);
router.put('/:id',validateExpense, updateExpense);
router.delete('/:id', deleteExpense);

module.exports = router;
