//An class to get the DB password, I added because i want more security :)
class dbPassword {
    private password: string;
    constructor(pwd: string) {
        this.password = pwd;
    }
    getPassword(): string {
        return this.password;
    }
}
const pwd: dbPassword = new dbPassword('airsoftG15935700g%');
//const pwd: dbPassword = new dbPassword('airsoftG15935700g%');
export default pwd;
