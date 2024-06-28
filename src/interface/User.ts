export default class User{

    id?: number;
    name: string;
    username: string;
    email: string;
    password?: string;
    sn_active?: string;
    birthday?: string | undefined;
    created_at?: Date;
    updated_at?: Date;

    constructor(name: string, username: string, email: string,  sn_active?: string, created_at?: Date, updated_at?: Date, birthday?: string, id?:number){

        this.id = id;
        this.name = name;
        this.username = username;
        this.email = email;
        this.sn_active = sn_active;
        this.birthday = birthday;
        this.created_at = created_at;
        this.updated_at = updated_at;

    }

}