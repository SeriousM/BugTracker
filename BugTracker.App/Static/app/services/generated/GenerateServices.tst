${
    using Typewriter.Extensions.WebApi;

    Template(Settings settings)
    {
        settings.OutputFilenameFactory = file => GetCamelCaseFileName(file.Name);
    }

    string GetCamelCaseFileName(string name)
    {
        // input "abc.cs"
        var camelCasedName = name.Substring(0,1).ToLower() + name.Substring(1);
        camelCasedName = camelCasedName.Substring(0, camelCasedName.Length - 3);
        camelCasedName += ".ts";

        return camelCasedName;
    }

    string serviceName(Class c)
    {
        return c.Name.Replace("Controller", "Service");
    }
    string fullType(Method p)
    {
        return "TODO List?<Model.?>";
    }
    string iterableType(Method p)
    {
        return "TODO List!";
    }
    string fullType(Parameter p)
    {
        return "TODO List?<Model.?>";
    }
    string innerType(Method p)
    {
        return "TODO Model.?";
    }
}$Classes(c => c.Namespace == "BugTracker.App.Controllers" && c.Name.EndsWith("Controller"))[import { Injectable } from "angular2/core";
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { Http } from 'angular2/http';
import * as Parser from '../../utils/model/parser';
import * as Models from '../../models/models';
import * as ServiceBase from '../service.base';

@Injectable()
export class $serviceName {
    constructor(private http: Http) { 
    }
    $Methods[public $name($Parameters[$name: $fullType][, ]): ServiceBase.ITypedPromise<$fullType> {
        return this.http
            .request(`$Url`, {
                method: "$HttpMethod",
                body: $RequestData
            })
            .map<$fullType>(response => {
                var model = Parser.createModelFromPoco<$fullType>($innerType, response.json());
                return model;
            })
            .map<$fullType>(response => {
                var models = Parser.createModelsFromPoco<$fullType>($iterableType, $innerType, response.json());
                return models;
            })
            .toPromise();
    }][
    ]
}]