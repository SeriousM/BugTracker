import { Component } from "angular2/core";
import { AppStore } from "../../store/appStore";

import { CurrentUserStoreActions } from "../currentUser/currentUserStoreActions";

@Component({
    selector: "user-avatar",
    template: `
        <div>
            <p>Welcome {{appStore.getState().currentUser.user.name}}! <Button (click)="logout()">Logout</Button></p>
        </div>
    `
})

export class UserAvatar {
    constructor(private appStore:AppStore){
        
    }
    logout(){
        this.appStore.dispatch(CurrentUserStoreActions.RemoveCurrentUser());
    }
}