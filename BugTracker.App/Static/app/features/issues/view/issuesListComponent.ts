import { List } from 'immutable';

import { Component, OnDestroy, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from "angular2/core";
import { AppStore } from "../../../store/appStore";
import { IssueModel } from "../../../models/models";

import { Issue } from "./issueComponent";
import { IssueStoreActions } from "../store/issueStoreActions";

@Component({
    selector: "issue-list",
    changeDetection: ChangeDetectionStrategy.Detached,
    directives: [Issue],
    template: `
        <ul>
            <li *ngFor="#issue of issues">
                <issue [issue]="issue" (issueChanged)="issueChanged($event)"></issue>
            </li>
        </ul>
    `
})

export class IssuesList implements OnInit, OnDestroy {
    private appStoreUnsubscribe: Function;
    private issues: List<IssueModel>;
    constructor(private appStore: AppStore, private changeDetectorRef: ChangeDetectorRef) {
    }
    onAppStoreUpdate() {
        this.issues = this.appStore.getState().issues;
        this.changeDetectorRef.markForCheck();
    }
    ngOnInit(){
        this.appStoreUnsubscribe = this.appStore.subscribe(this.onAppStoreUpdate.bind(this));
        this.onAppStoreUpdate();
    }
    ngOnDestroy() {
        this.appStoreUnsubscribe();
    }
    issueChanged(issueModel: IssueModel) {
        this.appStore.dispatch(IssueStoreActions.ChangeTitle(issueModel.title));   
    }
}