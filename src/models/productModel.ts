import { RowDataPacket } from "mysql2";
import con from "../config/connect";
import Product from "../interface/Product";

interface ProductRow extends RowDataPacket, Omit<Product, 'constructor'> {}
interface TotalCount extends RowDataPacket {
    total: number;
  }

const getAllProducts = async (page: number, limitQuery:number): Promise<Product[] | null> => {
    const limit = limitQuery || 50;
    const offset = (page - 1) * limit;
    const [rows] = await con.promise().query<ProductRow[]>('SELECT * FROM product LIMIT ? OFFSET ?', [limit, offset]);

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

const getTotalProducts = async (): Promise<number> => {
    const [rows] = await con.promise().query<TotalCount[]>('SELECT COUNT(*) as total FROM product');
    const { total } = rows[0];
    return total;
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

const getProductByCode = async (code: string): Promise<Product[] | null> => {

    const [rows] = await con.promise().query<ProductRow[]>(`SELECT * FROM product WHERE cd_product LIKE '%${code}%'`);

    if(rows.length > 0){
        return rows.map(row => {
            const product = new Product(row.nm_product, row.cd_product, row.status, row.sku, row.id);
            product.created_at = row.created_at;
            product.updated_at = row.updated_at;
            return product;
        })
    }

    return null;

}

const getProductByName = async (name:string): Promise<Product[] | null> => {

    const [rows] = await con.promise().query<ProductRow[]>(`SELECT * FROM product WHERE nm_product LIKE '%${name}%'`);

    if(rows.length > 0){
        return rows.map(row => {
            const product = new Product(row.nm_product, row.cd_product, row.status, row.sku, row.id);
            product.created_at = row.created_at;
            product.updated_at = row.updated_at;
            return product;
        })
    }

    return null;
    

} 

const createProduct = async (data:Product, categoryIds:number[]): Promise<void> => {

    const [categories]: any = await con.promise().query("SELECT * FROM category WHERE id IN (?)", [categoryIds]);
    const existingCategoryIds = categories.map((category: any) => category.id);

    if(existingCategoryIds.length !== categoryIds.length){
        throw new Error('One or more categories do not exist.');
    }

    const values = [data.nm_product, data.cd_product, data.status, data.sku];
    const [result]: any = await con.promise().query("INSERT INTO product (nm_product, cd_product, status, sku) VALUES (?, ?, ?, ?)", values);

    const productId = result.insertId;

    const productCategoryValues = categoryIds.map((categoryId: number) => [productId, categoryId]);
    await con.promise().query("INSERT INTO product_category (id_product, id_category) VALUES ?", [productCategoryValues]);

}


const updateProduct = async (id:number, data: Product): Promise<void> => {

    const setClause = [];
    const values = [];

    if(data.nm_product){
        setClause.push("nm_product = ?");
        values.push(data.nm_product);
    }
    if(data.cd_product){
        setClause.push("cd_product = ?");
        values.push(data.cd_product);
    }
    if(data.status){
        setClause.push("status = ?");
        values.push(data.status);
    }
    if(data.sku){
        setClause.push("sku = ?");
        values.push(data.sku);
    }

    if(setClause.length === 0){
        throw new Error("No data was provided to update the product.");
    }

    const sql = `UPDATE product SET ${setClause.join(", ")} WHERE id=?`;

    values.push(id);

    await con.promise().query(sql, values);

}

const updateCategoriesProduct = async (id: number, categoryIds: number[]): Promise<void> => {

    const [categories]: any = await con.promise().query("SELECT * FROM category WHERE id IN (?)", [categoryIds]);
    const existingCategoryIds: number[] = categories.map((category: any) => category.id);

    if(existingCategoryIds.length !== categoryIds.length){
        throw new Error('One or more categories do not exist'); 
    }

    const [currentCategories]:any = await con.promise().query("SELECT * FROM product_category WHERE id_product=?", [id]);
    const currentCategoryIds: number[] = currentCategories.map((category: any) => category.id_category);

    const categoriesToAdd = existingCategoryIds.filter((idCategory: number) => !currentCategoryIds.includes(idCategory));
    const categoriesToRemove = currentCategoryIds.filter((idCategory: number) => !existingCategoryIds.includes(idCategory));

    if(categoriesToAdd.length > 0){
        const productCategoriesValuesToAdd = categoriesToAdd.map((categoryId: number) => [id, categoryId]);
        await con.promise().query("INSERT INTO product_category (id_product, id_category) VALUES ?", [productCategoriesValuesToAdd]);
    }

    if(categoriesToRemove.length > 0){
        await con.promise().query("DELETE FROM product_category WHERE id_product=? AND id_category IN (?)", [id, categoriesToRemove])
    }

}

const deleteProduct = async (id: number): Promise<void> => {

    await con.promise().query("DELETE FROM product WHERE id=?", [id]);

}

export { getAllProducts, getProductById, getProductByCode, getProductByName, createProduct, updateProduct, deleteProduct, getTotalProducts, updateCategoriesProduct, Product }; 