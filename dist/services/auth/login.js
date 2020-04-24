"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
//A class login that loges a user;
class Login {
    constructor(user) {
        this.user = user;
    }
    //Main function that loges a new user
    main(Db) {
        return __awaiter(this, void 0, void 0, function* () {
            const Full = this.allFull();
            if (!Full) {
                return false;
            }
            const success = yield Db.compareUsers(this.user);
            return success;
        });
    }
    //If the rest want the user we will give it
    getLogedUser(Db) {
        return __awaiter(this, void 0, void 0, function* () {
            const DbUser = yield Db.searchUser(this.user.getEmail());
            return DbUser;
        });
    }
    //Function to show if fields are full
    allFull() {
        if (!this.user.getEmail() || !this.user.getAuth()) {
            return false;
        }
        else {
            return true;
        }
    }
}
exports.default = Login;
//# sourceMappingURL=login.js.map