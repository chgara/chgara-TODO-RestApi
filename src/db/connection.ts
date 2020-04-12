import { promisify } from 'util';
import mysql, { Pool, MysqlError, PoolConnection, QueryFunction } from 'mysql';
import { blue, red } from 'colors';
import Db from './keys';

export interface PromisifiedPool extends Omit<Pool, 'query'> {
    query: QueryFunction | Function;
}

export const pool: PromisifiedPool = mysql.createPool(Db.db);
pool.getConnection((err: MysqlError, connection: PoolConnection) => {
    if (err) {
        console.log(red('ERROR: '), err);
        return;
    }
    if (connection) {
        connection.release();
        console.log(red('DB'), blue(' connected'));
        return;
    }
});
pool.query = promisify(pool.query);
export default pool;
