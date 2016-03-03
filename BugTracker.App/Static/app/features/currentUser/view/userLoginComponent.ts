import { Component } from "angular2/core";

import { AppStore } from "../../../store/appStore";
import { Navigator } from "../../../utils/routing";
import { CurrentUserStoreActions } from "../../currentUser/store/currentUserStoreActions";
import { UserModel, IUserModelUpdate, RegisterUserModel } from '../../../models/models';
import { UserService } from '../../../services/services';
import { AuthService } from '../../../services/authService';

@Component({
    selector: "user-login",
    template: `
        <div>
            <form (ngSubmit)="login(input)">
                <input type="text" placeholder="Your Username" autocomplete="off" #input><button>Ok</button>
            </form> 
        </div>
    `
})

export class UserLogin {

    constructor(private appStore: AppStore, private userService: UserService, private navigator: Navigator, private authService: AuthService) {
        var currentUser = this.authService.getUserFromLocalStorage();
        if (currentUser != null) {
            this.appStore.dispatch(CurrentUserStoreActions.SetCurrentUser(currentUser));
            this.navigator.navigateToIssues();
        }
    }

    login(input: HTMLInputElement) {
        var username = input.value;

        if (username == null || !username.length) {
            return;
        }

        var model = new RegisterUserModel().setUsername(username);

        this.userService.registerIfUnknown(model).then(
            model => {
                this.authService.setUserToLocalStorage(model);
                this.appStore.dispatch(CurrentUserStoreActions.SetCurrentUser(model));
                this.navigator.navigateToIssues();
            },
            error => console.error("error", error));
    }
}