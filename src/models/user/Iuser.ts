import { token } from '../../config/types';
//Interface of Users that will be implemented in models Users.

interface Iuser {
    getEmail(): string;
    getUsername(): string;
    getAuth(): string | token;
}
export default Iuser;
