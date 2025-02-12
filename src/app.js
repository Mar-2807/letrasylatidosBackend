import express from 'express';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import cors from 'cors';

import authRoutes from './routes/auth.routes.js';
import forosRoutes from './routes/foros.routes.js';
import appRoutes from './routes/app.routes.js';
import bookRoutes from './routes/book.routes.js';
import likesRoutes from './routes/likes.routes.js'
import topRoutes from './routes/top.routes.js'
const app = express();

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));

app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());

app.use(authRoutes);
app.use(forosRoutes);
app.use(appRoutes);
app.use(bookRoutes);
app.use(likesRoutes);
app.use(topRoutes);

export default app;
