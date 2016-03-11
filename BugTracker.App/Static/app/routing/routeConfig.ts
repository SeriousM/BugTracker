import { RouteDefinition } from "angular2/router";

import { routeNames } from "./navigator";

import { UserLogin } from "../features/currentUser/view/userLoginComponent";
import { IssuesContainer } from "../features/issues/view/issuesContainerComponent";
import { EditIssue } from "../features/issues/view/editIssueCompontent";

export const routeConfig: RouteDefinition[] = [
    { path: '/login', name: routeNames.Login, component: UserLogin, useAsDefault: true },
    { path: '/issues', name: routeNames.Issues, component: IssuesContainer },
    { path: '/issue/new', name: routeNames.NewIssue, component: EditIssue },
    { path: '/issue/edit/:id', name: routeNames.EditIssue, component: EditIssue }
]