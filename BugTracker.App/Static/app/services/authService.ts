import {Injectable, provide} from 'angular2/core';

import { UserModel, IUserModelUpdate } from '../models/models';

@Injectable()
export class AuthService {
    private static USER_STORAGE_KEY: string = "user";

    public getUserFromLocalStorage(): UserModel {
        var plainUserObject = localStorage.getItem(AuthService.USER_STORAGE_KEY);
        if (plainUserObject == null) {
            return null;
        }

        var storedUser = <IUserModelUpdate>JSON.parse(plainUserObject);
        return new UserModel(storedUser);
    }

    public setUserToLocalStorage(user: UserModel) {
        var plainUserObject = JSON.stringify(user.getUpdateModel());
        localStorage.setItem(AuthService.USER_STORAGE_KEY, plainUserObject);
    }

    public removeUserFromLocalStorage() {
        localStorage.removeItem(AuthService.USER_STORAGE_KEY);
    }
}

export var AUTH_PROVIDERS: Array<any> = [
    provide(AuthService, { useClass: AuthService })
];
