import { Injectable, Injector } from "angular2/core";
import { Router, RouteDefinition, RouteParams } from "angular2/router";

import { UserLogin } from "../features/currentUser/view/userLoginComponent";
import { IssuesContainer } from "../features/issues/view/issuesContainerComponent";
import { EditIussue } from "../features/issues/view/editIssueCompontent";

export const routeNames = {
    Login: "Login",
    Issues: "Issues",
    NewIssue: "NewIssue",
    EditIssue: "EditIssue"
}

export const routeConfig: RouteDefinition[] = [
    { path: '/login', name: routeNames.Login, component: UserLogin, useAsDefault: true },
    { path: '/issues', name: routeNames.Issues, component: IssuesContainer },
    { path: '/issue/new', name: routeNames.NewIssue, component: EditIussue },
    { path: '/issue/edit/:id', name: routeNames.EditIssue, component: EditIussue }
]

@Injectable()
export class Navigator {
    constructor() {

    }
    public navigateToLogin() {
        this.router.navigate([routeNames.Login, {}]);
    }
    public navigateToIssues() {
        this.router.navigate([routeNames.Issues, {}]);
    }
    public navigateToNewIssue() {
        this.router.navigate([routeNames.NewIssue, {}]);
    }
    public navigateToEditIssue(issueId: string) {
        this.router.navigate([routeNames.EditIssue, { id: issueId }]);
    }
    public paramsForEditIssue() {
        var routeParams = this.injector.resolveAndInstantiate(RouteParams).get(RouteParams);
        return {
            id: routeParams.get("id")
        }
    }
}