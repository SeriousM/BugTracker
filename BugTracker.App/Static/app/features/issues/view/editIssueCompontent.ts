import { Component, Input, OnDestroy, OnInit} from "angular2/core";
import { Router, RouteParams } from 'angular2/router';
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
                
                <div [hidden]="!title.control.hasError('required')" class="alert alert-danger">
                    Title is required
                </div> 
                 <div [hidden]="!title.control.hasError('startsWithoutNumber')" class="alert alert-danger">
                    Title should not start with a number
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


export class EditIussue {

    private appStoreUnsubscribe: Function;
    private editModel: IIssueModelUpdate;
    private issueModel: IssueModel;
    private issueFormModel: ControlGroup;
    private isNewItem: boolean;

    constructor(private appStore: AppStore, private formBuilder: FormBuilder, private issueService: IssueService, private router: Router, private routeParams: RouteParams) {
        this.setInputModel();
        this.setFormValidation();
    }

    private setInputModel() {
        var issueId = this.routeParams.get('id')
        if (issueId != null) {
            this.issueModel = this.appStore.getState().issues.find(x => x.id == issueId);
            if (this.issueModel == null) {
                this.editModel = new IssueModel().getUpdateModel();
                console.error("Could not find issues with the id '" + issueId + "' in the AppStore.");
                return;
            }

            this.editModel = this.issueModel.getUpdateModel();
            this.isNewItem = false;
        }
        else {
            this.isNewItem = true;
        }
    }

    private setFormValidation() {
        this.issueFormModel = this.formBuilder.group({
            'title': ['', Validators.compose([Validators.required, CustomValidators.startsWithoutNumber])],
            'content': ['', CustomValidators.startWithUpperCase]
        });
    }

    private saveChanges() {
        var newIssuesModel = new IssueModel(this.editModel);
        
        // call webApi
        if (this.isNewItem) {
            // set userId
            this.editModel.userId = this.appStore.getState().currentUser.user.id;
            
            // create the issues 
            this.issueService.create(newIssuesModel).then(
                model => {
                    console.log("Add Issue to Store");
                    // store dispatch
                    this.appStore.dispatch(IssueStoreActions.AddIssue(newIssuesModel));
                    this.router.navigate(['Issues']);
                },
                error => {
                    console.error("Could not create new issue", error);
                });
        }
        else {
            // update the issues 
            this.issueService.update(newIssuesModel).then(
                () => {
                    console.log("Update Issue in Store");
                    // store dispatch
                    this.appStore.dispatch(IssueStoreActions.UpdateIssue(newIssuesModel));
                    this.router.navigate(['Issues']);
                },
                error => {
                    console.error("Could not update the issue", error);
                });
        }
        
        // change route to issues list                
        console.log("Changed object: ", new IssueModel(this.editModel));
    }
}