import { Injectable } from "angular2/core";
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { Http } from 'angular2/http';
import * as Parser from '../../utils/model/parser';
import * as Models from '../../models/models';
import * as ServiceBase from '../service.base';

@Injectable()
export class IssueService {
    constructor(private http: Http) { 
    }
    public create(issueModel: TODO List?<Model.?>): ServiceBase.ITypedPromise<TODO List?<Model.?>> {
        return this.http
            .request(`api/issue/`, {
                method: "post",
                body: issueModel
            })
            .map<TODO List?<Model.?>>(response => {
                var model = Parser.createModelFromPoco<TODO List?<Model.?>>(TODO Model.?, response.json());
                return model;
            })
            .map<TODO List?<Model.?>>(response => {
                var models = Parser.createModelsFromPoco<TODO List?<Model.?>>(TODO List!, TODO Model.?, response.json());
                return models;
            })
            .toPromise();
    }
    public getAllByUser(userId: TODO List?<Model.?>): ServiceBase.ITypedPromise<TODO List?<Model.?>> {
        return this.http
            .request(`api/issue/?userId=${userId}`, {
                method: "get",
                body: null
            })
            .map<TODO List?<Model.?>>(response => {
                var model = Parser.createModelFromPoco<TODO List?<Model.?>>(TODO Model.?, response.json());
                return model;
            })
            .map<TODO List?<Model.?>>(response => {
                var models = Parser.createModelsFromPoco<TODO List?<Model.?>>(TODO List!, TODO Model.?, response.json());
                return models;
            })
            .toPromise();
    }
}