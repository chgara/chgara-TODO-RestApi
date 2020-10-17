import { AuthUser, DBuser } from '../../models/user/user';
import DB from '../../db/Idb';

//A class that returns a user;
class Profile {
    private id: number;

    constructor(id: number) {
        this.id = id;
    }
    //Main function that loges a new user
    async main(Db: DB): Promise<DBuser> {
        const user: DBuser = await Db.searchUserById(this.id);
        return user;
    }
}
export default Profile;
