import { Component } from "angular2/core";
import { bootstrap } from "angular2/platform/browser";
import { WebService } from "./webservice/webservice";
import { AppStore } from "./store/appStore";

import { UserStoreActionTypes, UserStoreActions } from "./features/users/userStoreActions";

@Component({
    selector: "bug-tracker",
    template: "<p>hello world</p>"
})

export class App {
    constructor(appStore:AppStore){
        appStore.dispatch(UserStoreActions.AddUser("Martin"));
    }
}

bootstrap(App, [WebService, AppStore]);