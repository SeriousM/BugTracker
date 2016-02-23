import * as Immutable from 'immutable';
import { Injectable } from "angular2/core";
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { Http, Headers } from 'angular2/http';
import * as Parser from '../../utils/model/parser';
import * as Models from '../../models/models';
import * as ServiceBase from '../service.base';

@Injectable()
export class UserService {
    constructor(private http: Http) { 
    }
    public register(registrationModel: Models.RegisterUserModel): ServiceBase.ITypedPromise<<NOT FOUND! List?<Model.?>>> {
        return this.http
            .request(`api/user/`, {
                method: "post",
                body: ServiceBase.stringifyBody(registrationModel)
            })
            .toPromise();
    }
    public registerIfUnknown(registrationModel: Models.RegisterUserModel): ServiceBase.ITypedPromise<<NOT FOUND! List?<Model.?>>> {
        return this.http
            .request(`api/user/`, {
                method: "put",
                body: ServiceBase.stringifyBody(registrationModel)
            })
            .toPromise();
    }
    public get(id: string): ServiceBase.ITypedPromise<<NOT FOUND! List?<Model.?>>> {
        return this.http
            .request(`api/user/${id}`, {
                method: "get",
                body: ServiceBase.stringifyBody(null)
            })
            .toPromise();
    }
}