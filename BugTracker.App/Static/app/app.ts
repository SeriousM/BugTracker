import { Component } from "angular2/core";
import { bootstrap } from "angular2/platform/browser";
import { WebService } from "./webservice/webservice";
import { AppStore } from "./store/appStore";

import { CurrentUserState } from "./store/appStore.base";

import { UserLogin } from "./features/users/userLoginComponent";
import { UserAvatar } from "./features/users/userAvatarComponent";

@Component({
    selector: "bug-tracker",
    directives: [UserLogin, UserAvatar],
    template: `
        <div>
            <user-login *ngIf="!currentUser.isSet"></user-login>
            <user-avatar *ngIf="currentUser.isSet"></user-avatar>
        </div>
    `
})

export class App {
    public currentUser:CurrentUserState;
    constructor(private appStore:AppStore){
        appStore.subscribe(this.appStoreUpdate.bind(this));
        this.appStoreUpdate();
    }
    private appStoreUpdate(){
        this.currentUser = this.appStore.getState().currentUser;
    }
}

bootstrap(App, [WebService, AppStore]);