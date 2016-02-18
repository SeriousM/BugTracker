import { List } from 'immutable';

import { Component, OnDestroy } from "angular2/core";
import { AppStore } from "../../../store/appStore";
import { IssueModel } from "../../../store/storeModels";

import { Issue } from "./issueComponent";
import { IssueStoreActions } from "../store/issueStoreActions";

@Component({
    selector: "issue-list",
    directives: [Issue],
    template: `
        <ul>
            <li *ngFor="#issue of issues">
                <issue [issue]="issue" (issueChanged)="issueChanged($event)"></issue>
            </li>
        </ul>
    `
})

export class IssuesList implements OnDestroy {
    private appStoreUnsubscribe: Function;
    private issues: List<IssueModel>;
    constructor(private appStore: AppStore) {
        this.appStoreUnsubscribe = this.appStore.subscribe(this.onAppStoreUpdate.bind(this));
        this.onAppStoreUpdate();
    }
    onAppStoreUpdate() {
        this.issues = this.appStore.getState().issues;
    }
    ngOnDestroy() {
        this.appStoreUnsubscribe();
    }
    issueChanged(issueModel: IssueModel) {
        this.appStore.dispatch(IssueStoreActions.ChangeTitle(issueModel.title));   
    }
}