import { Component } from "angular2/core";
import { bootstrap } from "angular2/platform/browser";
import { WebService } from "./webservice/webservice";
import { UserStore } from "./stores/userStore";

@Component({
    selector: "bug-tracker",
    template: "<p>hello world</p>"
})

export class App { }

bootstrap(App, [WebService, UserStore]);