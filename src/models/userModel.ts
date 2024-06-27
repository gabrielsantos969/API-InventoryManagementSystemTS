import User from '../interface/User';
import con from '../config/connect';
import { RowDataPacket } from 'mysql2';

interface UserRow extends RowDataPacket, Omit<User, 'constructor'> {};

const getAllUsers = async (page: number, limitQuery: number, filters?: any): Promise<User[] | null> => {

    let rows;

    const limit = limitQuery || 50;
    const offset = (page - 1) * limit;
    const setFilters = [];
    const values = [];

    if(filters.name){
        setFilters.push('name = ?');
        values.push(filters.name);
    }

    if(filters.username){
        setFilters.push('username = ?');
        values.push(filters.username);
    }

    if(filters.email){
        setFilters.push('email = ?');
        values.push(filters.email);
    }

    if(filters.birthday){
        setFilters.push('birthday = ?');
        values.push(filters.birthday);
    }

    if(setFilters.length > 0){
        [rows] = await con.promise().query<UserRow[]>(`SELECT * FROM users  WHERE ${setFilters.join("AND")} LIMIT ? OFFSET ?`, [values, limit, offset]);
    }else{
        [rows] = await con.promise().query<UserRow[]>("SELECT * FROM users LIMIT ? OFFSET ?", [limit, offset]);
    }


    if(rows.length > 0){
        return rows.map(row => {
            const user = new User(row.name, row.username, row.email, row.sn_active, row.created_at, row.updated_at, row.birthday, row.id);
            return user;
        })
    }

    return null;

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

    if(!data.name || data.name == null || data.name == undefined || data.name.length == 0){
        throw new Error("The 'name' field is required.");
    }
    if(!data.email || data.email == null || data.email == undefined || data.email.length == 0){
        throw new Error("The 'email' field is required.");
    }
    if(!data.username || data.username == null || data.username == undefined || data.username.length == 0){
        throw new Error("The 'username' field is required.");
    }
    if(!data.password || data.password == null || data.password == undefined || data.password.length == 0){
        throw new Error("The 'passsword' field is required.");
    }
    
    const values = [data.name, data.username, data.email, data.password, data.birthday];

    await con.promise().query("INSERT INTO users (name, username, email, password, birthday) VALUES (?,?,?,?,?)", [values]);

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

export { getAllUsers, getUserById, getUserByUsername, getUserByName, getUserByEmail, createUser, updateUser, deleteUser, User};