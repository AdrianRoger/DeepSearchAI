import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import 'express-async-errors';
import { json } from 'body-parser';
import Router from './routes/routes';
import { errorMiddleware } from './middlewares/errorMiddleware';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(json());

app.use('/api', Router);
app.use(errorMiddleware);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});