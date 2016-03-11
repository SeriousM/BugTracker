import { Injectable } from "angular2/core";
import { Router } from "angular2/router";

export const routeNames = {
    Login: "Login",
    Issues: "Issues",
    NewIssue: "NewIssue",
    EditIssue: "EditIssue"
}

@Injectable()
export class Navigator {
    constructor(private router : Router) {
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
}