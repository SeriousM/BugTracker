import * as Immutable from 'immutable';
import { Injectable } from "angular2/core";
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { Http } from 'angular2/http';
import * as Parser from '../../utils/model/parser';
import * as Models from '../../models/models';
import * as ServiceBase from '../service.base';

@Injectable()
export class TypewriterTestService {
    constructor(private http: Http) { 
    }
    public getSimpleStringMessage(): ServiceBase.ITypedPromise<string> {
        return this.http
            .request(`api/typewriterTest/`, {
                method: "get",
                body: ServiceBase.stringifyBody(null)
            })
            .toPromise();
    }
    public getSimpleStringMessageFromCustomRoute(message: string): ServiceBase.ITypedPromise<string> {
        return this.http
            .request(`api/typewriter/api/messages/${message}`, {
                method: "get",
                body: ServiceBase.stringifyBody(null)
            })
            .toPromise();
    }
    public getFilteredUserModels(searchString: string): ServiceBase.ITypedPromise<Immutable.List<Models.UserModel>> {
        return this.http
            .request(`api/typewriter/api/messages/{searchString:string=\"\"}?searchString=${searchString}`, {
                method: "get",
                body: ServiceBase.stringifyBody(null)
            })
            .map<Immutable.List<Models.UserModel>>(response => {
                var models = Parser.createModelsFromPoco<Immutable.List<Models.UserModel>, Models.UserModel>(Immutable.List, Models.UserModel, response.json());
                return models;
            })
            .toPromise();
    }
    public getUserModel(): ServiceBase.ITypedPromise<Models.UserModel> {
        return this.http
            .request(`api/typewriterTest/`, {
                method: "get",
                body: ServiceBase.stringifyBody(null)
            })
            .map<Models.UserModel>(response => {
                var model = Parser.createModelFromPoco<Models.UserModel>(Models.UserModel, response.json());
                return model;
            })
            .toPromise();
    }
    public getUserModels(): ServiceBase.ITypedPromise<Immutable.List<Models.UserModel>> {
        return this.http
            .request(`api/typewriterTest/`, {
                method: "get",
                body: ServiceBase.stringifyBody(null)
            })
            .map<Immutable.List<Models.UserModel>>(response => {
                var models = Parser.createModelsFromPoco<Immutable.List<Models.UserModel>, Models.UserModel>(Immutable.List, Models.UserModel, response.json());
                return models;
            })
            .toPromise();
    }
    public createNewUser(user: Models.RegisterUserModel): ServiceBase.ITypedPromise<Models.UserModel> {
        return this.http
            .request(`api/typewriterTest/`, {
                method: "put",
                body: ServiceBase.stringifyBody(user)
            })
            .map<Models.UserModel>(response => {
                var model = Parser.createModelFromPoco<Models.UserModel>(Models.UserModel, response.json());
                return model;
            })
            .toPromise();
    }
    public changeUserId(users: Models.UserModel, index: number): ServiceBase.ITypedPromise<Immutable.List<Models.UserModel>> {
        return this.http
            .request(`api/typewriterTest/`, {
                method: "post",
                body: ServiceBase.stringifyBody({ users: users, index: index })
            })
            .map<Immutable.List<Models.UserModel>>(response => {
                var models = Parser.createModelsFromPoco<Immutable.List<Models.UserModel>, Models.UserModel>(Immutable.List, Models.UserModel, response.json());
                return models;
            })
            .toPromise();
    }
    public modifyUserWithoutResult(user: Models.UserModel): ServiceBase.ITypedPromise<<NOT FOUND! List?<Model.?>>> {
        return this.http
            .request(`api/typewriterTest/`, {
                method: "post",
                body: ServiceBase.stringifyBody(user)
            })
            .toPromise();
    }
    public deleteUser(userId: string): ServiceBase.ITypedPromise<<NOT FOUND! List?<Model.?>>> {
        return this.http
            .request(`api/typewriterTest/`, {
                method: "delete",
                body: ServiceBase.stringifyBody(userId)
            })
            .toPromise();
    }
    public getCreationDate(): ServiceBase.ITypedPromise<Models.UserModel> {
        return this.http
            .request(`api/typewriterTest/`, {
                method: "head",
                body: ServiceBase.stringifyBody(null)
            })
            .map<Models.UserModel>(response => {
                var model = Parser.createModelFromPoco<Models.UserModel>(Models.UserModel, response.json());
                return model;
            })
            .toPromise();
    }
}