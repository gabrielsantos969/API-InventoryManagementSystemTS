import app from './app';
import dotenv from 'dotenv';
dotenv.config();

const PORT = parseInt(`${process.env.PORT || 3000}`);
const HOST = process.env.HOST || 'http://localhost';

app.listen(PORT, () => console.log(`Server is running at ${HOST}:${PORT}.`));
