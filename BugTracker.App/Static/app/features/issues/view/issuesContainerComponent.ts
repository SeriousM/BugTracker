import { Component } from "angular2/core";
import { Router } from "angular2/router";

import { AppStore } from "../../../store/appStore";
import { IssuesList } from "./issuesListComponent";

@Component({
    selector: "issues-container",
    directives: [IssuesList],
    template: `
        <Button (click)="newIssue()">New Issue</Button>
        
        <br />
        <br />       
        
        <issue-list></issue-list>
    `
})

export class IssuesContainer {
    constructor(private appStore: AppStore, private router : Router) {
    }
    
    private newIssue()
    {
        this.router.navigate(['NewIssues']);
    }
}