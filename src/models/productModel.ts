import { RowDataPacket } from "mysql2";
import con from "../config/connect";
import Product from "../interface/Product";

interface ProductRow extends RowDataPacket, Omit<Product, 'constructor'> {}

const getAllProducts = async (): Promise<Product[] | null> => {
    const [rows] = await con.promise().query<ProductRow[]>('SELECT * FROM product');

    if(rows.length > 0){
        
        return rows.map(row => {
            const product = new Product(row.nm_product, row.cd_product, row.status, row.sku, Number(row.id));
            product.created_at = row.created_at;
            product.updated_at = row.updated_at;
            return product;
        })

    }

    return null

}

const getProductById = async (id: number): Promise<Product[] | null> => {

    const [rows] = await con.promise().query<ProductRow[]>("SELECT * FROM product WHERE id=?", [id]);

    if(rows.length > 0){

        return rows.map(row => {
            const product = new Product(row.nm_product, row.cd_product, row.status, row.sku, Number(row.id));
            product.created_at = row.created_at;
            product.updated_at = row.updated_at;
            return product;
        })

    }

    return null;

}

export { getAllProducts, getProductById, Product }; 