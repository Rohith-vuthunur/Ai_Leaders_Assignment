const dotenv = require('dotenv');
const cors = require('cors');
const express = require('express');
const app = express();
const authRoutes = require('./routes/auth');
const examRoutes = require('./routes/exam');
dotenv.config({ path: './backend/.env' });
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/exam', examRoutes);
const connectDB = require('./config/db');
const PORT = process.env.PORT||5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
connectDB();
