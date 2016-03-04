import { List } from 'immutable';

import { Component, OnDestroy, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from "angular2/core";
import { Router } from "angular2/router";

import { AppStore } from "../../../store/appStore";
import { IssueModel } from "../../../models/models";

import { Issue } from "./issueComponent";
import { IssueStoreActions } from "../store/issueStoreActions";
import { SessionStateActions } from "../../common/store/sessionStateStoreActions";
import { IssueService } from "../../../services/services"

@Component({
    selector: "issue-list",
    changeDetection: ChangeDetectionStrategy.Detached,
    directives: [Issue],
    template: `
        <table class="table table-striped">
            <tr>
                <th></th>
                <th></th>
                <th>Title</th>
                <th>Content</th>
                <th>Reported Date</th>
                <th>Closed</th>
            </tr>
            <tr *ngFor="#issue of issues">
                <td><button class="glyphicon glyphicon-edit" (click)="editIssue(issue.id)"></button></td>
                <td><button class="glyphicon glyphicon-trash"></button></td>
                <td>{{ issue.title }}</td>
                <td>{{ issue.content }}</td>
                <td>{{ issue.reportDate }}</td>
                <td>{{ issue.isClosed }}</td>
            </tr>
        </table>
    `
})

export class IssuesList implements OnInit, OnDestroy {
    private appStoreUnsubscribe: Function;
    private issues: List<IssueModel>;

    constructor(private appStore: AppStore, private changeDetectorRef: ChangeDetectorRef, private issueService: IssueService, private router: Router) {
    }

    onAppStoreUpdate() {
        this.issues = this.appStore.getState().issues;
        this.changeDetectorRef.markForCheck();
    }

    ngOnInit() {
        this.appStoreUnsubscribe = this.appStore.subscribe(this.onAppStoreUpdate.bind(this));
        this.onAppStoreUpdate();

        if (!this.appStore.getState().sessionState.areIssuesLoaded) {
            this.loadIssues();
        }
    }

    private editIssue(issueId: string) {
        this.router.navigate(['EditIssues', { id: issueId }]);
    }

    private loadIssues() {
        var currentUserId = this.appStore.getState().currentUser.user.id;

        this.issueService.getAllByUser(currentUserId).then(
            models => {
                models.forEach(issue => this.appStore.dispatch(IssueStoreActions.AddIssue(issue)));
                this.appStore.dispatch(SessionStateActions.ChangeIssueLoadedState(true));
            },
            error => console.error("error", error));
    }

    ngOnDestroy() {
        this.appStoreUnsubscribe();
    }

    issueChanged(issueModel: IssueModel) {
        this.appStore.dispatch(IssueStoreActions.ChangeTitle(issueModel.title));
    }
}