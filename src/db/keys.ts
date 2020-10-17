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
const url: string = process.env.DBURL ? process.env.DBURL : 'localhost';
const password: string = process.env.DBPASS || dbPassword.getPassword();
const Db: Ikey = new Keys(
	2,
	url,
	process.env.DBUSER || 'root',
	password,
	process.env.DBNAME || 'TODOLIST',
);
/*const Db: Ikey = new Keys(
    5,
    'localhost',
    'root',
    dbPassword.getPassword(),
    'apirest',
);*/
export default Db;
