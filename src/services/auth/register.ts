import { AuthUser, DBuser } from '../../models/user/user';
import DB from '../../db/Idb';

//A class Register that register a user;
class Register {
    private user: AuthUser;

    constructor(user: AuthUser) {
        this.user = user;
    }

    //A function that register the user
    async main(Db: DB): Promise<boolean> {
        const Full: boolean = this.allFull();
        if (!Full) {
            return false;
        }
        const success: boolean = await Db.addUser(this.user);
        return success;
    }

    //If the rest want the user we will give it
    async getRegisterdUser(Db: DB): Promise<DBuser> {
        const DbUser: DBuser = await Db.searchUser(this.user.getEmail());
        return DbUser;
    }

    //Function to show if fields are full
    private allFull(): boolean {
        if (!this.user.getEmail() || !this.user.getAuth() || !this.user.getUsername()) {
            return false;
        } else {
            return true;
        }
    }
}
export default Register;
