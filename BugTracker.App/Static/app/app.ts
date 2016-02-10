import { Component } from "angular2/core";
import { bootstrap } from "angular2/platform/browser";
import { WebService } from "./webservice/webservice";
import { AppStore } from "./store/appStore";

@Component({
    selector: "bug-tracker",
    template: "<p>hello world</p>"
})

export class App {
    constructor(appStore:AppStore){
        
    }
}

bootstrap(App, [WebService, AppStore]);