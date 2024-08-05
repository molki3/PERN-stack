import express from 'express';
import morgan from 'morgan';
import taskRouter from './routes/tasks.routes.js';
import { PORT } from './config.js';
import cors from 'cors';


const app = express();

// Settings

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Routes
app.use(taskRouter);

// Error Middleware (Called from task.controllers.js)
app.use((error, req, res, next) => res.json({message: error.message}));

app.listen(PORT);