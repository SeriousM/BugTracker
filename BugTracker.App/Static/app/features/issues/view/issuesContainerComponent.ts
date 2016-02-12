import { Component } from "angular2/core";
import { AppStore } from "../../../store/appStore";

import { IssuesList } from "./issuesListComponent";
import { AddNewIssue } from "./addNewissueComponent";

@Component({
    selector: "issues-container",
    directives: [IssuesList, AddNewIssue],
    template: `
        <add-new-issue></add-new-issue>
        <issue-list></issue-list>
    `
})

export class IssuesContainer {
    constructor(private appStore: AppStore) {

    }
}