import User from '../interface/User';
import con from '../config/connect';
import { RowDataPacket } from 'mysql2';
import bcrypt from 'bcrypt';
import { formatDateForBr, formatDateForMySQL } from '../utils/formatDate';

interface UserRow extends RowDataPacket, Omit<User, 'constructor'> {};
interface TotalCount extends RowDataPacket {
    total: number;
}
const SALT_ROUNDS = 10;

const getAllUsers = async (page: number, limitQuery: number, filters?: any): Promise<User[] | null> => {

    let rows;

    const limit = limitQuery || 50;
    const offset = (page - 1) * limit;
    const setFilters = [];
    const values = [];

    if(filters.name){
        setFilters.push(`name LIKE '%${filters.name}%'`);
    }

    if(filters.username){
        setFilters.push(`username  LIKE '%${filters.username}%'`);
    }

    if(filters.email){
        setFilters.push(`email LIKE '%${filters.email}%'`);
    }

    if(filters.birthday){
        setFilters.push('birthday = ?');
        values.push(formatDateForMySQL(filters.birthday));
    }

    if(setFilters.length > 0 && values.length > 0){
        [rows] = await con.promise().query<UserRow[]>(`SELECT * FROM users  WHERE ${setFilters.join("AND ")} LIMIT ? OFFSET ?`, [values, limit, offset]);
    }else if(setFilters.length > 0 && values.length == 0){
        [rows] = await con.promise().query<UserRow[]>(`SELECT * FROM users  WHERE ${setFilters.join("AND ")} LIMIT ? OFFSET ?`, [limit, offset]);
    }
    else{
        [rows] = await con.promise().query<UserRow[]>("SELECT * FROM users LIMIT ? OFFSET ?", [limit, offset]);
    }


    if(rows.length > 0){
        return rows.map(row => {
            const birthday = row.birthday ? new Date(row.birthday) : undefined;
            const formattedBirthday = birthday ? formatDateForBr(birthday) : undefined;
            const user = new User(row.name, row.username, row.email, row.sn_active, row.created_at, row.updated_at, formattedBirthday, row.id);
            return user;
        })
    }

    return null;

}

const getTotalUsers = async (): Promise<number> => {
    const [rows] = await con.promise().query<TotalCount[]>("SELECT count(*) as total FROM users");
    const { total } = rows[0];
    return total;
}

const getUserById = async (id: number): Promise<User[] | null> => {

    const [rows] = await con.promise().query<UserRow[]>("SELECT * FROM users WHERE id=?", [id]);

    if(rows.length > 0){
        return rows.map(row => {
            const user = new User(row.name, row.username, row.email, row.sn_active, row.created_at, row.updated_at, row.birthday, row.id);
            return user;
        })
    }

    return null;

}

const getUserByUsername = async (username: string): Promise<User[] | null> => {

    const [rows] = await con.promise().query<UserRow[]>(`SELECT * users WHERE username LIKE '%${username}%'`);

    if(rows.length > 0){
        return rows.map(row => {
            const user = new User(row.name, row.username, row.email, row.sn_active, row.created_at, row.updated_at, row.birthday, row.id);
            return user;
        })
    }

    return null;

}

const getUserByName = async (name: string): Promise<User[] | null> => {

    const [rows] = await con.promise().query<UserRow[]>(`SELECT * users WHERE name LIKE '%${name}%'`);

    if(rows.length > 0){
        return rows.map(row => {
            const user = new User(row.name, row.username, row.email, row.sn_active, row.created_at, row.updated_at, row.birthday, row.id);
            return user;
        })
    }

    return null;

}

const getUserByEmail = async (email: string): Promise<User[] | null> => {

    const [rows] = await con.promise().query<UserRow[]>("SELECT * FROM users WHERE email = ?", [email]);

    if(rows.length > 0){
        return rows.map(row => {
            const user = new User(row.name, row.username, row.email, row.sn_active, row.created_at, row.updated_at, row.birthday, row.id);
            return user;
        })
    }

    return null;
}

const createUser = async (data: User): Promise<void> => {

    const setClause = [];
    const setParams = [];
    const values = [];

    if(data.name){
        setClause.push("name");
        setParams.push("?");
        values.push(data.name);
    }
    if(data.email){
        setClause.push("email");
        setParams.push("?");
        values.push(data.email);
    }
    if(data.username){
        setClause.push("username");
        setParams.push("?");
        values.push(data.username);
    }
    if(data.password){
        setClause.push("password");
        setParams.push("?");
        const hashPassword = await bcrypt.hash(data.password, SALT_ROUNDS);
        values.push(hashPassword);
    }
    if(data.birthday){
        setClause.push("birthday");
        setParams.push("?");
        values.push(formatDateForMySQL(new Date(data.birthday)));
    }

    await con.promise().query(`INSERT INTO users (${setClause.join(", ")}) VALUES (${setParams.join(",")})`, values);

}

const updateUser = async (id: number, data: User): Promise<void> => {

    const setClause = [];
    const values = [];

    if(data.name){
        setClause.push('name = ?');
        values.push(data.name)
    }

    if(data.username){
        setClause.push('username = ?');
        values.push(data.username);
    }

    if(data.email){
        setClause.push('email = ?');
        values.push(data.email);
    }

    if(data.birthday){
        setClause.push('birthday = ?');
        values.push(data.birthday);
    }

    if(setClause.length == 0){
        throw new Error('No data was provided to update the user.')
    }

    values.push(id);

    await con.promise().query(`UPDATE users SET ${setClause.join(", ")} WHERE id=?`, values);

}

const deleteUser = async (id: number): Promise<void> => {

    await con.promise().query("DELETE FROM users WHERE id=?", [id]);

}

const verifyPasswordUser = async (login: any, password: string): Promise<boolean> => {

    const setLoginType = [];
    const values = [];

    if(login.email){
        setLoginType.push("email = ?");
        values.push(login.email);
    }
    if(login.username){
        setLoginType.push("username = ?");
        values.push(login.username);
    }

    const [rows]: any = await con.promise().query(`SELECT * FROM users WHERE ${setLoginType.join("OR ")}`, values);

    if(rows.length === 0){
        throw new Error('User not found');
    }

    const hashPassword = rows[0].passsword;
    return await bcrypt.compare(password, hashPassword);


}

export { getAllUsers, getTotalUsers, getUserById, getUserByUsername, getUserByName, getUserByEmail, createUser, updateUser, deleteUser, verifyPasswordUser, User};