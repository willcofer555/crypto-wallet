import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import authRoutes from './routes/authRoutes';
import analyticsRoutes from './routes/analyticsRoutes';
import userRoutes from './routes/userRoutes';
import walletRoutes from './routes/walletRoutes';

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors()); // Enable Cross-Origin Resource Sharing
app.use(helmet()); // Enhance security by setting various HTTP headers
app.use(morgan('combined')); // Log HTTP requests

// Routes
app.use('/auth', authRoutes);
app.use('/analytics', analyticsRoutes);
app.use('/user', userRoutes);

export default app;