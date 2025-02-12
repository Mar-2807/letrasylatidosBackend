import express from 'express';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import cors from 'cors';

import authRoutes from './routes/auth.routes.js';
import forosRoutes from './routes/foros.routes.js';
import appRoutes from './routes/app.routes.js';
import bookRoutes from './routes/book.routes.js';
import likesRoutes from './routes/likes.routes.js';
import topRoutes from './routes/top.routes.js';

import path from 'path';

const app = express();

const allowedOrigins = [
    'https://letrasylatidos.com',  
    'http://localhost:5173' 
  ];
  
  app.use(cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true
  }));

app.use(express.static(path.join(__dirname, 'build')));
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

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
