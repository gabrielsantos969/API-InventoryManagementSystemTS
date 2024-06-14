import mysql from 'mysql2';

const con = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: 'inventory_manager_system',
    port: 3306
})

export default con;