import { Component } from "angular2/core";
import { Navigator } from "../../../routing/navigator";

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
    constructor(private appStore: AppStore, private navigator: Navigator) {
    }
    
    private newIssue() {
        this.navigator.navigateToNewIssue();
    }
}