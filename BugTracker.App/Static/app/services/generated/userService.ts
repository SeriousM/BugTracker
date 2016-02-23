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
    public register(registrationModel: Models.RegisterUserModel): ServiceBase.ITypedPromise<Models.UserModel> {
        
        return this.http
            .request(`api/user/Register`, {
                method: "post",
                body: ServiceBase.stringifyBody(registrationModel)
            })
            .map<Models.UserModel>(response => {
                var model = Parser.createModelFromPoco<Models.UserModel>(Models.UserModel, response.json());
                return model;
            })
            .toPromise();
    }
    public registerIfUnknown(registrationModel: Models.RegisterUserModel): ServiceBase.ITypedPromise<Models.UserModel> {
        
        return this.http
            .request(`api/user/RegisterIfUnknown`, {
                method: "put",
                body: ServiceBase.stringifyBody(registrationModel)
            })
            .map<Models.UserModel>(response => {
                var model = Parser.createModelFromPoco<Models.UserModel>(Models.UserModel, response.json());
                return model;
            })
            .toPromise();
    }
    public get(id: string): ServiceBase.ITypedPromise<Models.UserModel> {
        
        return this.http
            .request(`api/user/Get?id=${id}`, {
                method: "get",
                body: ServiceBase.stringifyBody(null)
            })
            .map<Models.UserModel>(response => {
                var model = Parser.createModelFromPoco<Models.UserModel>(Models.UserModel, response.json());
                return model;
            })
            .toPromise();
    }
}