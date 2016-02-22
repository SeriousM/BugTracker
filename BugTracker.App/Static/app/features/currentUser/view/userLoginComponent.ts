import { Component, Inject } from "angular2/core";
import { AppStore } from "../../../store/appStore";
import { UserModel } from "../../../store/storeModels";
import { WebService } from "../../../webservice/webService";

import { CurrentUserStoreActions } from "../../currentUser/store/currentUserStoreActions";
import * as Models from '../../../models/models';

@Component({
    selector: "user-login",
    providers: [WebService],
    template: `
        <div>
            <form (ngSubmit)="login(input)">
                <input type="text" placeholder="Your Username" autocomplete="off" #input><button>Ok</button>
            </form> 
        </div>
    `
})

export class UserLogin {
    constructor(private appStore: AppStore, private webservice : WebService) {
    }
    
    login(input: HTMLInputElement) {
        
        var model = new Models.RegisterUserModel();
        model = model.setUsername(input.value);
        
        this.webservice.registerIfUnknown(model).then(model => console.log("success", model), error => console.error("error", error));
        
        var username = input.value;
        
        if (username == null || !username.length) {
            return;
        }

        this.appStore.dispatch(CurrentUserStoreActions.SetCurrentUser(new UserModel(username)));
        input.value = '';
    }
}