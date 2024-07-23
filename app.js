require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const { sequelize } = require('./models');
const authRoutes = require('./routes/authRoutes');
const expenseRoutes = require('./routes/expenseRoutes');
const authMiddleware = require('./middleware/authMiddleware');
const db =require('./models/index');
const app = express();
app.use(bodyParser.json());

app.use('/user', authRoutes);
app.use('/expense', expenseRoutes,authMiddleware);

const PORT = process.env.PORT || 3000;

db.sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
