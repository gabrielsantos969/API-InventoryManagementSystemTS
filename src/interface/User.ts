export default class User{

    id?: number;
    name: string;
    username: string;
    email: string;
    password: string;
    sn_active?: string;

    constructor(name: string, username: string, email: string, password: string, sn_active?: string, id?:number){

        this.id = id;
        this.name = name;
        this.username = username;
        this.email = email;
        this.password = password;
        this.sn_active = sn_active;

    }

}