import * as Immutable from 'immutable';
import { Injectable } from "angular2/core";
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { Http, Headers } from 'angular2/http';
import * as Parser from '../../utils/model/parser';
import * as Models from '../../models/models';
import * as ServiceBase from '../service.base';

@Injectable()
export class IssueService {
    constructor(private http: Http) {
    }
    public getIssueById(issueId: string): ServiceBase.ITypedPromise<Models.IssueModel> {
        
        return this.http
            .request(`api/issue/issueId?issueId=${issueId}`, {
                method: "get",
                body: ServiceBase.stringifyBody(null)
            })
            .map<Models.IssueModel>(response => {
                var model = Parser.createModelFromPoco<Models.IssueModel>(Models.IssueModel, response.json());
                return model;
            })
            .toPromise();
    }
    public create(issueModel: Models.IssueModel): ServiceBase.ITypedPromise<Models.IssueModel> {
        
        return this.http
            .request(`api/issue/Create`, {
                method: "post",
                body: ServiceBase.stringifyBody(issueModel)
            })
            .map<Models.IssueModel>(response => {
                var model = Parser.createModelFromPoco<Models.IssueModel>(Models.IssueModel, response.json());
                return model;
            })
            .toPromise();
    }
    public update(issueModel: Models.IssueModel): ServiceBase.IPromise {
        
        return this.http
            .request(`api/issue/Update`, {
                method: "put",
                body: ServiceBase.stringifyBody(issueModel)
            })
            .map(response => {
                return null;
            })
            .toPromise();
    }
    public getAllByUser(userId: string): ServiceBase.ITypedPromise<Immutable.List<Models.IssueModel>> {
        
        return this.http
            .request(`api/issue/GetAllByUser?userId=${userId}`, {
                method: "get",
                body: ServiceBase.stringifyBody(null)
            })
            .map<Immutable.List<Models.IssueModel>>(response => {
                var models = Parser.createModelsFromPoco<Immutable.List<Models.IssueModel>, Models.IssueModel>(Immutable.List, Models.IssueModel, response.json());
                return models;
            })
            .toPromise();
    }
}