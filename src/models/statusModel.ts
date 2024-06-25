import { RowDataPacket } from 'mysql2';
import con from '../config/connect';
import Status from '../interface/Status';

interface StatusRow extends RowDataPacket, Omit<Status, 'constructor'> {};

const getAllStatus = async (): Promise<Status[] | null> => {

    const [rows] = await con.promise().query<StatusRow[]>("SELECT * FROM status");

    if(rows.length > 0){
        return rows.map(row => {
            const status = new Status(row.nm_status, row.id);
            status.created_at = row.created_at;
            status.updated_at = row.updated_at;
            return status;
        });
    }

    return null;
}

const getStatusById = async (id: number): Promise<Status[] | null> => {

    const [rows] = await con.promise().query<StatusRow[]>("SELECT * FROM status WHERE id=?", [id]);
 
    if(rows.length > 0){
        return rows.map(row => {
            const status = new Status(row.nm_status, row.id);
            status.created_at = row.created_at;
            status.updated_at = row.updated_at;
            return status;
        })
    }

    return null;

}

const createStatus = async (data: Status): Promise<void> => {

    const sql = "INSERT INTO status (nm_status) VALUES (?)";
    const values = [data.nm_status.toUpperCase()];
    await con.promise().query(sql, values);

}

export { getAllStatus, getStatusById, createStatus, Status};