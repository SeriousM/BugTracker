import { Component, Input, Output, ChangeDetectionStrategy, EventEmitter } from "angular2/core";
import { AppStore } from "../../../store/appStore";
import { IssueModel } from "../../../store/storeModels";

@Component({
    selector: "issue",
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
        <div>{{issue.title}}<input type="text" value="{{issue.title}}" #input><button (click)="changeTitle(input)">Change</button></div>
    `
})

export class Issue {
    @Input() issue: IssueModel;
    @Output() issueChanged = new EventEmitter<IssueModel>();
    constructor(private appStore:AppStore) {
    }
    private changeTitle(input: HTMLInputElement) {
        var title = input.value;

        if (title == null || !title.length) {
            return;
        }

        this.issueChanged.emit(this.issue.setTitle(title));
    }
}