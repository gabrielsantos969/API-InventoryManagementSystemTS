import 'express-async-errors';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';

import productsRouter from './routes/productRouter';
import statusRouter from './routes/statusRouter';
import categoryRouter from './routes/categoryRouter';
import productCategoriesRouter from './routes/productCategoryRouter'

const app = express();

app.use(morgan('tiny'));

app.use(cors());

app.use(helmet());

app.use(express.json()); 

app.use('/products', productsRouter);
app.use('/status', statusRouter);
app.use('/categories', categoryRouter);
app.use('/categoryProducts', productCategoriesRouter)

export default app;