import { Component, Input, OnDestroy, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from "angular2/core";
import {RouteParams} from 'angular2/router';
import {NgForm, Control, ControlGroup, FormBuilder, Validators } from 'angular2/common';

import { AppStore } from "../../../store/appStore";
import { IssueModel, IIssueModelUpdate } from "../../../models/models";

@Component(
    {
        selector: "edit-issue",
        changeDetection: ChangeDetectionStrategy.OnPush,
        template: `
            <form (ngSubmit)="onSubmit()" [ngFormModel]="issueForm">
                <div class="form-group">
                    <label for="title">Title</label>
                    <input required type="title" class="form-control" id="title" [(ngModel)]="editModel.title" ngControl="title"  #title="ngForm">
                </div>
                
                <div [hidden]="title.control.valid" class="alert alert-danger">
                    Title is required
                </div> 
                
                <div class="form-group">
                    <label for="content">Content</label>
                    <textarea class="form-control" rows="5" id="content" [(ngModel)]="editModel.content" ngControl="content" #content="ngForm"></textarea>
                </div>
                <div [hidden]="!content.control.hasError('startWithPlatos')" class="alert alert-danger">
                    Content must start with 'Platos'
                </div> 
                
                <div class="form-group">
                    <label for="reportedDate">Closed</label>
                    <input type="checkbox" value="">
                </div>
                <button type="submit" class="btn btn-default">Save</button>
            </form>
        `
    })


export class EditIussue implements OnInit, OnDestroy {
    private appStoreUnsubscribe: Function;
    private editModel: IIssueModelUpdate;
    @Input() issue = new IssueModel({ title: "Test1", content: "Testcontent 1" });
    @Input() simpleModel = new SimpleModel("Test1", "Test Content 1");
    issueForm: ControlGroup;

    constructor(private appStore: AppStore, private fb: FormBuilder, private changeDetectorRef: ChangeDetectorRef /*, private routeParams: RouteParams*/) {

        this.issueForm = fb.group({
            'title': ['', Validators.required],
            'content': ['', CustomValidators.startWithPlatos]
        }); 
    
        /*this.issue.
        this.issue.setTitle("");
        this.issue.setContent("");*/
        
        //this.issue.setTitle("test");
        //console.log("tet");
        // TODO: find issues based the id in the route parameter
        //var issueId = routeParams.get('id'); 
        
        //this.issue = appStore.getState().issues.first();
    }

    onAppStoreUpdate() {
        /*this.issue = this.appStore.getState().issues.first();
        if (this.issue != null) {
            console.log("TITEL: " + this.issue.title);
            this.changeDetectorRef.markForCheck();
        }*/
    }
    ngOnInit() {
        this.editModel = <IIssueModelUpdate> this.issue.toJS();
        // this.appStoreUnsubscribe = this.appStore.subscribe(this.onAppStoreUpdate.bind(this));
        // this.onAppStoreUpdate();
    }

    ngOnDestroy() {
        // this.appStoreUnsubscribe();
    }

    public onSubmit() {
        // call webApi
        
        // store dispatch
        
        // change route to issues list
        
        console.log("Changed object: ", new IssueModel(this.editModel));
    }
}

export class SimpleModel {
    title: string;
    content: string;

    constructor(title: string, content: string) {
        this.title = title;
        this.content = content;
    }
}



export class CustomValidators {
    static startWithPlatos(c: Control): ValidationResult {
        return !c.value.match(/^Platos/) ? { "startWithPlatos": true } : null;
    }
}

interface ValidationResult {
    [key: string]: boolean;
}