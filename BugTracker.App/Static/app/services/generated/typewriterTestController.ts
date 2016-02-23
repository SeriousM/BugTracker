import * as Immutable from 'immutable';
import { Injectable } from "angular2/core";
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { Http, Headers } from 'angular2/http';
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
            .map<string>(response => {
                return response.json();
            })
            .toPromise();
    }
    public getSimpleStringMessageFromCustomRoute(message: string): ServiceBase.ITypedPromise<string> {
        return this.http
            .request(`api/messages/getMessage/${message}`, {
                method: "get",
                body: ServiceBase.stringifyBody(null)
            })
            .map<string>(response => {
                return response.json();
            })
            .toPromise();
    }
    public getMessageList(messages: Immutable.List<string>): ServiceBase.ITypedPromise<Immutable.List<string>> {
        return this.http
            .request(`api/typewriterTest/?messages=${messages}`, {
                method: "get",
                body: ServiceBase.stringifyBody(null)
            })
            .map<Immutable.List<string>>(response => {
                var models = Immutable.List<string>(response.json());
                return models;
            })
            .toPromise();
    }
    public getFilteredUserModels(searchString: string): ServiceBase.ITypedPromise<Immutable.List<Models.UserModel>> {
        return this.http
            .request(`api/messages/getFilteredMessage/{searchString=User 1}?searchString=${searchString}`, {
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
    public setUserId(user: Models.UserModel, newId: string): ServiceBase.ITypedPromise<Models.UserModel> {
        return this.http
            .request(`api/typewriterTest/`, {
                method: "post",
                body: ServiceBase.stringifyBody({ user: user, newId: newId })
            })
            .map<Models.UserModel>(response => {
                var model = Parser.createModelFromPoco<Models.UserModel>(Models.UserModel, response.json());
                return model;
            })
            .toPromise();
    }
    public modifyUserWithoutResult(user: Models.UserModel): ServiceBase.IPromise {
        return this.http
            .request(`api/typewriterTest/`, {
                method: "post",
                body: ServiceBase.stringifyBody(user)
            })
            .map(response => {
                return null;
            })
            .toPromise();
    }
    public addUsers(user: Immutable.Stack<Models.UserModel>): ServiceBase.IPromise {
        return this.http
            .request(`api/typewriterTest/`, {
                method: "post",
                body: ServiceBase.stringifyBody(user)
            })
            .map(response => {
                return null;
            })
            .toPromise();
    }
    public deleteUser(userId: string): ServiceBase.IPromise {
        return this.http
            .request(`api/typewriterTest/`, {
                method: "delete",
                body: ServiceBase.stringifyBody(userId)
            })
            .map(response => {
                return null;
            })
            .toPromise();
    }
    public getCreationDate(): ServiceBase.ITypedPromise<Headers> {
        return this.http
            .request(`api/typewriterTest/`, {
                method: "head",
                body: ServiceBase.stringifyBody(null)
            })
            .map<Headers>(response => {
                return response.headers;
            })
            .toPromise();
    }
    public methodeWithoutHttpVerb(): ServiceBase.ITypedPromise<<NOT FOUND! List?<Model.?>>> {
        return this.http
            .request(`api/typewriterTest/`, {
                method: "post",
                body: ServiceBase.stringifyBody(null)
            })
            .toPromise();
    }
}