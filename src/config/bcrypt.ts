import bcrypt from 'bcryptjs';

//Creating a class to encrypt or compare passwords
class Bcryptjs implements Ibcrypt {
    private bytes: number;

    constructor(bytes?: number) {
        this.bytes = bytes || 15;
    }

    public encryptPassword(password: string): string {
        const salt = bcrypt.genSaltSync(this.bytes);
        const encryptedPassword: string = bcrypt.hashSync(password, salt);
        return encryptedPassword;
    }
    public comparePassword(password: string, DbPassword: string): boolean {
        const success: boolean = bcrypt.compareSync(password, DbPassword);
        return success;
    }
}
export interface Ibcrypt {
    encryptPassword(password: string): string;
    comparePassword(password: string, DbPassword: string): boolean;
}
const encripter: Ibcrypt = new Bcryptjs(10);
export default encripter;
