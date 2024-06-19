import mysql from 'mysql2';
import dotenv from 'dotenv';
dotenv.config();

const con = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || '',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_DATABASE || 'inventory_manager_system',
    port: Number(process.env.DB_PORT) || 3306,
  });

export default con;
