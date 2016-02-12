import { Component, Input, OnDestroy } from "angular2/core";
import { AppStore } from "../../store/appStore";
import { IssueModel } from "../../store/appStore.base";

@Component({
    selector: "issue",
    template: `
        <p>- {{issue.title}}</p>
    `
})

export class Issue {
    @Input() issue:IssueModel;
    constructor(){
    }
}