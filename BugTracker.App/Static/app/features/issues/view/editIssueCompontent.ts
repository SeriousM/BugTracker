import { Component, Input, OnDestroy, OnInit} from "angular2/core";
import { RouteParams } from 'angular2/router';
import { NgForm, Control, ControlGroup, FormBuilder, Validators } from 'angular2/common';

import { AppStore } from "../../../store/appStore";
import { IssueModel, IIssueModelUpdate } from "../../../models/models";
import { CustomValidators } from "../../../validations/customValidators"
import { IssueService } from "../../../services/services"
import { IssueStoreActions } from "../store/issueStoreActions";

@Component(
    {
        selector: "edit-issue",
        template: `
            <form (ngSubmit)="saveChanges()" #issueForm="ngForm" [ngFormModel]="issueFormModel">
                <div class="form-group">
                    <label for="title">Title</label>
                    <input type="title" class="form-control" id="title" [(ngModel)]="editModel.title" ngControl="title"  #title="ngForm">
                </div>
                
                <div [hidden]="title.control.valid" class="alert alert-danger">
                    Title is required
                </div> 
                
                <div class="form-group">
                    <label for="content">Content</label>
                    <textarea class="form-control" rows="5" id="content" [(ngModel)]="editModel.content" ngControl="content" #content="ngForm"></textarea>
                </div>
                <div [hidden]="!content.control.hasError('startWithUpperCase')" class="alert alert-danger">
                    Content must start with upper case
                </div>                 
                <button type="submit" class="btn btn-default" [disabled]="!issueForm.form.valid">Save</button>
            </form>
        `
    })


export class EditIussue implements OnInit, OnDestroy {

    private appStoreUnsubscribe: Function;
    private editModel: IIssueModelUpdate;
    private issueFormModel: ControlGroup;
    private isNewItem: boolean;

    constructor(private appStore: AppStore, private formBuilder: FormBuilder, private issueService: IssueService, private routeParams: RouteParams) {

        var issueId = this.routeParams.get('id')
        if (issueId != null) {
            this.editModel = this.appStore.getState().issues.find(x => x.id == issueId).getUpdateModel();
            this.editModel.userId = this.appStore.getState().currentUser.user.id;
            this.isNewItem = false;
        }
        else {
            this.isNewItem = true;
        }

        this.setFormValidation();
    }

    private setFormValidation() {
        this.issueFormModel = this.formBuilder.group({
            'title': ['', Validators.required],
            'content': ['', CustomValidators.startWithUpperCase]
        });
    }

    private saveChanges() {

        var issueModel = new IssueModel(this.editModel);
        
        // call webApi
        if (this.isNewItem) {
            this.issueService.create(issueModel).then(
                model => { this.appStore.dispatch(IssueStoreActions.AddIssue); },
                error => { console.error("Could not create new issue", error); }
            );
        }
        else {

        }
        // store dispatch
        
        // change route to issues list
                
        console.log("Changed object: ", new IssueModel(this.editModel));
    }

    public onAppStoreUpdate() {
        /*this.issue = this.appStore.getState().issues.first();
        if (this.issue != null) {
            console.log("TITEL: " + this.issue.title);
            this.changeDetectorRef.markForCheck();
        }*/
    }
    public ngOnInit() {
        //this.editModel = <IIssueModelUpdate> this.issue.toJS();
        // this.appStoreUnsubscribe = this.appStore.subscribe(this.onAppStoreUpdate.bind(this));
        // this.onAppStoreUpdate();
    }

    public ngOnDestroy() {
        // this.appStoreUnsubscribe();
    }
}