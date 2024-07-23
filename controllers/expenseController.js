const { Expense, User } = require('../models');
const sendEmail = require('../utils/sendEmail');
let db=require('../models/index');

const createExpense = async (req, res) => {
  const { amount, description, date, category } = req.body;
  try {
    const expense = await db.Expense.create({ amount, description, date, category, userId: req.user.id });

    const user = await db.User.findByPk(req.user.id);
    const emailText = `Hello ${user.name},\n\nA new expense has been created:\n\nAmount: ${amount}\nDescription: ${description}\nDate: ${date}\nCategory: ${category}\n\nThank you for using our service.`;

    await sendEmail(user.email, 'New Expense Created', emailText);

    res.status(201).send(expense);
  } catch (err) {
    res.status(400).send({ error: 'Failed to create expense.' });
  }
};

const getAllExpenses = async (req, res) => {
  try {
    const expenses = await db.Expense.findAll({ where: { userId: req.user.id } });
    res.status(200).send(expenses);
  } catch (err) {
    res.status(400).send({ error: 'Failed to retrieve expenses.' });
  }
};

const getExpenseById = async (req, res) => {
  try {
    const expense = await db.Expense.findOne({ where: { id: req.params.id, userId: req.user.id } });
    if (!expense) {
      return res.status(404).send({ error: 'Expense not found.' });
    }
    res.status(200).send(expense);
  } catch (err) {
    res.status(400).send({ error: 'Failed to retrieve expense.' });
  }
};

const updateExpense = async (req, res) => {
  try {
    const expense = await db.Expense.findOne({ where: { id: req.params.id, userId: req.user.id } });
    if (!expense) {
      return res.status(404).send({ error: 'Expense not found.' });
    }

    const updatedExpense = await expense.update(req.body);

    const user = await db.User.findByPk(req.user.id);
    const emailText = `Hello ${user.name},\n\nYour expense has been updated:\n\nAmount: ${updatedExpense.amount}\nDescription: ${updatedExpense.description}\nDate: ${updatedExpense.date}\nCategory: ${updatedExpense.category}\n\nThank you for using our service.`;

    await sendEmail(user.email, 'Expense Updated', emailText);

    res.status(200).send(updatedExpense);
  } catch (err) {
    res.status(400).send({ error: 'Failed to update expense.' });
  }
};

const deleteExpense = async (req, res) => {
  try {
    const expense = await db.Expense.findOne({ where: { id: req.params.id, userId: req.user.id } });
    if (!expense) {
      return res.status(404).send({ error: 'Expense not found.' });
    }

    await expense.destroy();

    const user = await db.User.findByPk(req.user.id);
    const emailText = `Hello ${user.name},\n\nYour expense has been deleted:\n\nAmount: ${expense.amount}\nDescription: ${expense.description}\nDate: ${expense.date}\nCategory: ${expense.category}\n\nThank you for using our service.`;

    await sendEmail(user.email, 'Expense Deleted', emailText);

    res.status(200).send({ message: 'Expense deleted successfully' });
  } catch (err) {
    res.status(400).send({ error: 'Failed to delete expense.' });
  }
};

module.exports = {
  createExpense,
  getAllExpenses,
  getExpenseById,
  updateExpense,
  deleteExpense
};
