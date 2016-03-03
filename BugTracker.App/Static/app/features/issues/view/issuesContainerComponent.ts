import { Component } from "angular2/core";
import { Navigator } from "../../../utils/routing";

import { AppStore } from "../../../store/appStore";
import { IssuesList } from "./issuesListComponent";
import { AddNewIssue } from "./addNewIssueComponent";

@Component({
    selector: "issues-container",
    directives: [IssuesList, AddNewIssue],
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