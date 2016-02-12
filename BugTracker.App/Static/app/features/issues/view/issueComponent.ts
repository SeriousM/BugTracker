import { Component, Input } from "angular2/core";
import { AppStore } from "../../../store/appStore";
import { IssueModel } from "../../../store/storeModels";

@Component({
    selector: "issue",
    template: `
        {{issue.title}}
    `
})

export class Issue {
    @Input() issue: IssueModel;
    constructor() {
    }
}