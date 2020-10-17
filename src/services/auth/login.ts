import { AuthUser, DBuser } from '../../models/user/user';
import DB from '../../db/Idb';

//A class login that loges a user;
class Login {
    private user: AuthUser;

    constructor(user: AuthUser) {
        this.user = user;
    }
    //Main function that loges a new user
    async main(Db: DB): Promise<boolean> {
        const Full: boolean = this.allFull();
        if (!Full) {
            return false;
        }
        const success: boolean = await Db.compareUsers(this.user);
        return success;
    }

    //If the rest want the user we will give it
    async getLogedUser(Db: DB): Promise<DBuser> {
        const DbUser: DBuser = await Db.searchUser(this.user.getEmail());
        return DbUser;
    }

    //Function to show if fields are full
    private allFull(): boolean {
        if (!this.user.getEmail() || !this.user.getAuth()) {
            return false;
        } else {
            return true;
        }
    }
}
export default Login;
