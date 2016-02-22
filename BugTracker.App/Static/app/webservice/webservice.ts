import { Injectable } from "angular2/core";
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { Http, Response, Headers, BaseRequestOptions } from 'angular2/http';
import * as Models from '../models/models';
import { createModelFromPoco, createModelsFromPoco } from '../utils/model/parser';

@Injectable()
export class DefaultRequestOptions extends BaseRequestOptions {
    headers: Headers = new Headers({
        'Content-Type': 'application/json'
    });
}

interface IPromise<T>{
    then(success:(data:T)=>void,failure?:(error:any)=>void):IPromise<T>;
    catch(failure:(error:any)=>void):IPromise<T>;
    finally(always:()=>void):IPromise<T>;
}

@Injectable()
export class WebService {
    constructor(private http: Http) {
    }

    public registerIfUnknown(registerUserModel: Models.RegisterUserModel): IPromise<Models.UserModel> {
        var bodyContent = JSON.stringify(registerUserModel);
        console.log("JSON: " + bodyContent);
        bodyContent = "{ \"Username\": \"Bob\" }";

        return this.http
            .put("http://localhost:16449/api/User/RegisterIfUnknown", bodyContent)
            .map<Models.UserModel>(res => {
                var model = createModelFromPoco<Models.UserModel>(Models.UserModel, res.json());
                return model;
            })
            .toPromise();
    }
}
