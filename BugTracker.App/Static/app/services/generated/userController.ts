import { Injectable } from "angular2/core";
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { Http } from 'angular2/http';
import * as Parser from '../../utils/model/parser';
import * as Models from '../../models/models';
import * as ServiceBase from '../service.base';

@Injectable()
export class UserService {
    constructor(private http: Http) { 
    }
    public register(registrationModel: TODO List?<Model.?>): ServiceBase.ITypedPromise<TODO List?<Model.?>> {
        return this.http
            .request(`api/user/`, {
                method: "post",
                body: registrationModel
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
    public registerIfUnknown(registrationModel: TODO List?<Model.?>): ServiceBase.ITypedPromise<TODO List?<Model.?>> {
        return this.http
            .request(`api/user/`, {
                method: "put",
                body: registrationModel
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
    public get(id: TODO List?<Model.?>): ServiceBase.ITypedPromise<TODO List?<Model.?>> {
        return this.http
            .request(`api/user/${id}`, {
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