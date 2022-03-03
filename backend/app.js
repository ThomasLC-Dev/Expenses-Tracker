import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

import checkAuth from './middlewares/checkAuth.js';

import authRoutes from './routes/authRoutes.js';
import categoriesRoutes from './routes/categoriesRoutes.js';
import expensesRoutes from './routes/expensesRoutes.js';
import incomesRoutes from './routes/incomesRoutes.js';
import projectsRoutes from './routes/projectsRoutes.js';
import usersRoutes from './routes/usersRoutes.js';

//App Config
dotenv.config();
const app = express();
const port = process.env.port || 8002

//Middlewares
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());

//DB Config
mongoose.connect(process.env.DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

//Routes
app.use("/auth", authRoutes);
app.use("/categories", checkAuth, categoriesRoutes);
app.use("/expenses", checkAuth, expensesRoutes);
app.use("/incomes", checkAuth, incomesRoutes);
app.use("/projects", checkAuth, projectsRoutes);
app.use("/users", checkAuth, usersRoutes);

//Listener
app.listen(port, () => console.log('Start on localhost:'+port));