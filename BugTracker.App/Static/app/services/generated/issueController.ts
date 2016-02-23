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
    public create(issueModel: Models.IssueModel): ServiceBase.ITypedPromise<<NOT FOUND! List?<Model.?>>> {
        return this.http
            .request(`api/issue/`, {
                method: "post",
                body: ServiceBase.stringifyBody(issueModel)
            })
            .toPromise();
    }
    public getAllByUser(userId: string): ServiceBase.ITypedPromise<<NOT FOUND! List?<Model.?>>> {
        return this.http
            .request(`api/issue/?userId=${userId}`, {
                method: "get",
                body: ServiceBase.stringifyBody(null)
            })
            .toPromise();
    }
}