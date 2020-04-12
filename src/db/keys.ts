//Creating the keys for the DB connection
import dbPassword from '../config/dbPwd';

export interface Ikeys {
    connectionLimit: number;
    host: string;
    user: string;
    password: string;
    database: string;
}
export interface Ikey {
    db: Ikeys;
}

class Keys implements Ikey {
    private database: Ikeys;
    get db() {
        return this.database;
    }
    constructor(
        connectionLimit: number,
        host: string,
        user: string,
        password: string,
        database: string,
    ) {
        this.database = {
            connectionLimit,
            host,
            user,
            password,
            database,
        };
    }
}
const password: string = process.env.DBPASS || dbPassword.getPassword();
const Db: Ikey = new Keys(5, 'localhost', 'root', password, 'TODOLIST');
/*const Db: Ikey = new Keys(
    5,
    'localhost',
    'root',
    dbPassword.getPassword(),
    'apirest',
);*/
export default Db;
