const express = require('express');
const app = express();
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const bookRouter = require('./routes/bookRoutes');
const borrowRouter = require('./routes/borrowingRoutes');
dotenv.config();


app.use(express.json());


app.use('/api', authRoutes);
app.use('/api', bookRouter);
app.use('/api', borrowRouter)


connectDB();
const PORT = process.env.PORT || 3002
app.listen(PORT, (req, res) => {
  console.log('Server is started on', PORT)
})



