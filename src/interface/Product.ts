export default class Product {
    id?:number;
    nm_product: string;
    cd_product: string;
    status: number;
    sku: string;
    created_at?: Date;
    updated_at?: Date;

    constructor(nm_product:string, cd_product:string, status:number, sku:string){
        this.nm_product = nm_product;
        this.cd_product = cd_product;
        this.status = status;
        this.sku = sku;
    }
}