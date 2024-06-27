import User from '../interface/User';
import con from '../config/connect';
import { RowDataPacket } from 'mysql2';

interface UserRow extends RowDataPacket, Omit<User, 'constructor'> {};

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

export { getUserById, User};