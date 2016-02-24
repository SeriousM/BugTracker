import { Component, Inject } from "angular2/core";
import { AppStore } from "../../../store/appStore";

import { CurrentUserStoreActions } from "../../currentUser/store/currentUserStoreActions";
import { UserModel, RegisterUserModel } from '../../../models/models';
import { UserService } from '../../../services/services';

@Component({
    selector: "user-login",
    // providers: [WebService],
    template: `
        <div>
            <form (ngSubmit)="login(input)">
                <input type="text" placeholder="Your Username" autocomplete="off" #input><button>Ok</button>
            </form> 
        </div>
    `
})

export class UserLogin {
    constructor(private appStore: AppStore, private userService : UserService) {//, private webservice : WebService) {
    }
    
    login(input: HTMLInputElement) {
        var username = input.value;        
        
        if (username == null || !username.length) {
            return;
        }
        
        var model = new RegisterUserModel().setUsername(username);
        
        
        this.userService.registerIfUnknown(model).then(
            model => {
                this.appStore.dispatch(CurrentUserStoreActions.SetCurrentUser(model));
                input.value = '';
            },
            error => console.error("error", error));
    }
}