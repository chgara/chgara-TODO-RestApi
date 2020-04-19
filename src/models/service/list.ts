import { Itodo, TodoList } from '../service/Ilist';
//Class of TODO object
class TODO implements Itodo {
    id: number;
    todo: string;
    create_at: Date;
    username: string;

    constructor(id: number, todo: string, created_at: Date, username: string) {
        this.id = id;
        this.todo = todo;
        this.create_at = created_at;
        this.username = username;
    }
}
export default TODO;
