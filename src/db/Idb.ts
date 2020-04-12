//Interface o DB that will implement some methods

import { DBuser, AuthUser } from '../models/user/user';

interface DB {
    searchUser(email: string): Promise<DBuser>;
    searchUserById(id: number): Promise<DBuser>;
    addUser(user: AuthUser): Promise<boolean>;
    compareUsers(user: AuthUser): Promise<boolean>;
}
export interface IdbData {
    id: number;
    username: string;
    email: string;
    password: string;
}
export default DB;
