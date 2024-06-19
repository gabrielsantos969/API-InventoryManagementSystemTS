export default class Status {

    id?: number;
    nm_status: string;
    created_at?: Date;
    updated_at?: Date;

    constructor(nm_status: string, id?: number){
        this.id = id;
        this.nm_status = nm_status;
    }

}