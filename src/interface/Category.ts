export default class Category {

    id?: number;
    nm_categroy: string;
    sn_active: string;
    created_at?: Date;
    updated_at?: Date;

    constructor(nm_category: string, sn_active: string, id?:number, created_at?: Date, updated_at?: Date){
        this.id = id;
        this.nm_categroy = nm_category;
        this.sn_active = sn_active;
        this.created_at = created_at;
        this.updated_at = updated_at;
    }

}