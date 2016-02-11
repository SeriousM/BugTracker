import { Component } from "angular2/core";
import { AppStore } from "../../store/appStore";
import { UserModel } from "../../store/appStore.base";

import { CurrentUserStoreActions } from "../currentUser/currentUserStoreActions";

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
    constructor(private appStore:AppStore){
        
    }
    login(input:HTMLInputElement){
        var username = input.value;
        
        if (username == null || !username.length){
            return;
        }
        
        this.appStore.dispatch(CurrentUserStoreActions.SetCurrentUser(new UserModel(username)));
    }
}