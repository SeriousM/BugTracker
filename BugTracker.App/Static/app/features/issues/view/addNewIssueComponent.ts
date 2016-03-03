import { Component, OnDestroy } from "angular2/core";
import { AppStore } from "../../../store/appStore";

import { IssueStoreActions } from "../../issues/store/issueStoreActions";

@Component({
    selector: "add-new-issue",
    template: `
        <form (ngSubmit)="createNewIssue(input)">
            <input type="text" placeholder="New Issue Title" autocomplete="off" #input><button>Create</button>
        </form> 
    `
})

export class AddNewIssue {
    private appStoreUnsubscribe: Function;
    constructor(private appStore: AppStore) {
    }
    createNewIssue(input: HTMLInputElement) {
        var title = input.value;

        if (title == null || !title.length) {
            return;
        }

        //this.appStore.dispatch(IssueStoreActions.AddIssue(title));
        input.value = '';
    }
}