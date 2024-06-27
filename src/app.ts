import 'express-async-errors';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';

import productsRouter from './routes/productRouter';
import statusRouter from './routes/statusRouter';
import categoryRouter from './routes/categoryRouter';
import userRouter from './routes/userRouter';

const app = express();

app.use(morgan('tiny'));

app.use(cors());

app.use(helmet());

app.use(express.json()); 

app.use('/products', productsRouter);
app.use('/status', statusRouter);
app.use('/categories', categoryRouter);
app.use('/users', userRouter);

export default app;