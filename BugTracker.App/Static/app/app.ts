import { Component, provide } from "angular2/core";
import { HTTP_PROVIDERS, RequestOptions  } from 'angular2/http';
import { bootstrap } from "angular2/platform/browser";

import { Router, RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS, LocationStrategy, APP_BASE_HREF } from "angular2/router";

import { DefaultRequestOptions } from "./services/service.base";
import { AppStore, appStoreFactory } from "./store/appStore";
import { AppConfiguration } from './config/config.base';

import { APP_WEBSERVICES } from "./services/services"

import { AppHeaderComponent } from "./features/common/view/appHeaderComponent";
import { UserLogin } from "./features/currentUser/view/userLoginComponent";
import { IssuesContainer } from "./features/issues/view/issuesContainerComponent";

@RouteConfig([
    { path: '/login', name: 'Login', component: UserLogin, useAsDefault: true },
    { path: '/issues', name: 'Issues', component: IssuesContainer }
])

@Component({
    selector: "bug-tracker",
    directives: [AppHeaderComponent],
    template: `
        <div>
            <app-header></app-header>
            
            <!-- Routed views go here -->
            <router-outlet></router-outlet>
        </div>
    `
})

export class App {
    constructor(private appStore: AppStore) {
    }
}

var appConfiguration = new AppConfiguration((<any>window).appConfiguration);

bootstrap(App, [
    HTTP_PROVIDERS,
    APP_WEBSERVICES,
    ROUTER_PROVIDERS,
    provide(APP_BASE_HREF, { useValue: '/static' }),
    provide(AppConfiguration, { useValue: appConfiguration }),
    provide(RequestOptions, { useClass: DefaultRequestOptions }),
    provide(AppStore, { useFactory: appStoreFactory })
]);