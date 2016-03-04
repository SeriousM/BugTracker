import { Component, provide } from "angular2/core";
import { HTTP_PROVIDERS, RequestOptions  } from 'angular2/http';
import { Router, RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS, APP_BASE_HREF } from "angular2/router";

import { bootstrap } from "angular2/platform/browser";
import { DefaultRequestOptions } from "./utils/defaultRequestOptions";
import { AppStore, appStoreFactory } from "./store/appStore";
import { AppConfiguration } from './config/config.base';

import { APP_WEBSERVICES, AUTH_SERVICES } from "./services/services"
import { AuthService } from "./services/authService";

import { AppHeaderComponent } from "./features/common/view/appHeaderComponent";
import { UserLogin } from "./features/currentUser/view/userLoginComponent";
import { IssuesContainer } from "./features/issues/view/issuesContainerComponent";
import { EditIussue } from "./features/issues/view/editIssueCompontent";
import { CurrentUserStoreActions } from "./features/currentUser/store/currentUserStoreActions";

@RouteConfig([
    { path: '/login', name: 'Login', component: UserLogin, useAsDefault: true },
    { path: '/issues', name: 'Issues', component: IssuesContainer },
    { path: '/editIssue', name: 'NewIssues', component: EditIussue },
    { path: '/editIssue/:id', name: 'EditIssues', component: EditIussue }
])

@Component({
    selector: "bug-tracker",
    directives: [AppHeaderComponent, ROUTER_DIRECTIVES],
    template: `
        <div>
            <app-header></app-header>
            
            <!-- Routed views go here -->
            <router-outlet></router-outlet>
        </div>
    `
})

export class App {

    constructor(private appStore: AppStore, private authService: AuthService, private router : Router) {
        var currentUser = this.authService.getUserFromLocalStorage();
        if (currentUser != null) {
            this.appStore.dispatch(CurrentUserStoreActions.SetCurrentUser(currentUser));
        }
    }
}

var appConfiguration = new AppConfiguration((<any>window).appConfiguration);

bootstrap(App, [
    HTTP_PROVIDERS,
    APP_WEBSERVICES,
    ROUTER_PROVIDERS,
    AUTH_SERVICES,
    provide(APP_BASE_HREF, { useValue: '/static' }),
    provide(AppConfiguration, { useValue: appConfiguration }),
    provide(RequestOptions, { useClass: DefaultRequestOptions }),
    provide(AppStore, { useFactory: appStoreFactory })
]);