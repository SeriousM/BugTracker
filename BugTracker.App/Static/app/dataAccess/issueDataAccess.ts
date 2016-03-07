import { Injectable } from 'angular2/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/fromArray'; // required for Observable.of()

import { AppStore } from '../store/appStore';
import { IssueService } from '../services/services';
import { ITypedPromise } from '../services/service.base';
import { IssueModel } from '../models/models';

@Injectable()
export class IssueDataAccess {

    constructor(private appStore: AppStore, private issueService: IssueService) {
    }

    public getIssueById(id: string): ITypedPromise<IssueModel> {
        if (this.appStore.getState().sessionState.areIssuesLoaded) {
            var issuesFromStore = this.appStore.getState().issues.find(x => x.id == id);
            if (issuesFromStore != null) {
                return Observable.of<IssueModel>(issuesFromStore).toPromise();
            }
            else {
                return this.issueService.getIssueById(id);
            }
        }
        return this.issueService.getIssueById(id);;
    }
}