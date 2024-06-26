import { RowDataPacket } from 'mysql2';
import con from '../config/connect';
import Category from '../interface/Category';

interface CategoryRow extends RowDataPacket, Omit<Category, 'constructor'> {};

const getAllCategories = async (): Promise<Category[] | null> => {

    const [rows] = await con.promise().query<CategoryRow[]>("SELECT * FROM category");

    if(rows.length > 0){
        return rows.map(row => {
            const category = new Category(row.nm_category, row.sn_active, row.id, row.created_at, row.updated_at);
            return category;
        });
    }

    return null;

}

const getCategoreById = async (id: number): Promise<Category[] | null> => {

    const [rows] = await con.promise().query<CategoryRow[]>("SELECT * FROM category WHERE id=?", [id]);

    if(rows.length > 0){
        return rows.map(row => {
            const category = new Category(row.nm_category, row.sn_active, row.id, row.created_at, row.updated_at);
            return category;
        });
    }

    return null;

}

const updateActiveCategory = async (id: number, sn_active: string): Promise<void> => {

    const values = [sn_active.toUpperCase() , id];
    await con.promise().query("UPDATE category SET sn_active=? WHERE id=?", values);

}

export { getAllCategories, getCategoreById, updateActiveCategory, Category };