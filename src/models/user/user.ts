import { token } from '../../config/types';
import { TodoList } from '../service/Ilist';
import Iuser from './Iuser';
/*
 *   Classes for user models
 */
//The parent Model, it wont be used by the Api, it can be good for the polimorfism
export abstract class PrimitiveUser implements Iuser {
    protected name: string;
    protected email: string;

    constructor(name: string, email: string) {
        this.name = name;
        this.email = email;
    }

    getEmail(): string {
        return this.email;
    }

    getUsername(): string {
        return this.name;
    }

    abstract getAuth(): string | token;
}
export class AuthUser extends PrimitiveUser {
    protected password: string;

    constructor(name: string, email: string, password: string) {
        super(name, email);
        this.password = password;
    }

    getAuth(): string {
        return this.password;
    }
}
export class DBuser extends AuthUser {
    protected id: number;

    constructor(name: string, email: string, password: string, Id: number) {
        super(name, email, password);
        this.id = Id;
    }

    getId(): number {
        return this.id;
    }
}
// export class User extends DBuser {
//     protected list: TodoList;

//     constructor(
//         name: string,
//         email: string,
//         id: number,
//         list: TodoList,
//         password: string,
//     ) {
//         super(name, email, password, id);
//         this.list = list;
//     }

//     getList(): TodoList {
//         return this.list;
//     }
// }
