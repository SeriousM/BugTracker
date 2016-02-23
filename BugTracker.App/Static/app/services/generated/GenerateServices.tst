${
    using Typewriter.Extensions.WebApi;

    Template(Settings settings)
    {
        settings.OutputFilenameFactory = file => GetCamelCaseFileName(file.Name);
    }
    string debug(Func<string> action)
    {
        try{return action();}
        catch (Exception ex) {return ex.ToString();}
    }
    string GetCamelCaseFileName(string name)
    {
        // input: "abcController.cs"
        // output: "abcService.ts"
        var camelCasedName = name.Substring(0,1).ToLower() + name.Substring(1);
        camelCasedName = camelCasedName.Substring(0, camelCasedName.Length - 3);
        camelCasedName = camelCasedName.Replace("Controller", "Service");
        camelCasedName += ".ts";

        return camelCasedName;
    }
    Attribute getAttributeByName(AttributeCollection attributes, string name) { return attributes.FirstOrDefault(a => a.Name == name); }
    string extractIterableFromValue(string value)
    {
        // input: BugTracker.App.Attributes.TypescriptIterable.List, "UserModel"
        // wanted: List
        return System.Text.RegularExpressions.Regex.Match(value, @"BugTracker\.App.Attributes\.TypescriptIterable\.(.*),.*").Groups[1].Value;
    }
    string extractIterableFromTypescriptIterableTypeValue(string value)
    {
        // input: BugTracker.App.Attributes.TypescriptIterable.List
        // wanted: List
        return value.Substring("BugTracker.App.Attributes.TypescriptIterable.".Length);
    }
    string extractTypeFromValue(string value)
    {
        // input: BugTracker.App.Attributes.TypescriptIterable.List, "UserModel"
        // input: UserModel
        // wanted: UserModel
        var found = System.Text.RegularExpressions.Regex.Match(value, @".*""(.*)""").Groups[1].Value;
        return !string.IsNullOrEmpty(found) ? found : value;
    }
    string extractObsoleteMessage(string value, string name)
    {
        // input: 
        // input: Do not use it!
        // input: "Do not use it!", true
        var match = System.Text.RegularExpressions.Regex.Match(value, @"^(?:""(.*?)""|(.*))");
        var found = match.Groups[1].Success ? match.Groups[1].Value : match.Groups[2].Value;
        return !string.IsNullOrEmpty(found) ? found : $"Attention: '{name}' is marked as obsolete!";
    }
    string getInnerType(Type type)
    {
        if (type.IsEnumerable) type = type.TypeArguments.First();
        if (type.IsPrimitive) return type.name;
        return "Models." + type.Name;
    }

    string serviceName(Class c) { return c.Name.Replace("Controller", "Service"); }
    string fullType(Method m)
    {
        var attribute = getReturnsPocoAttribute(m);
        if (attribute != null) return attribute.Value;
        attribute = getReturnsPocosAttribute(m);
        if (attribute != null) return "Immutable." + extractIterableFromValue(attribute.Value) + "<" + extractTypeFromValue(attribute.Value) + ">";
        attribute = getReturnsModelAttribute(m);
        if (attribute != null) return "Models." + extractTypeFromValue(attribute.Value);
        attribute = getReturnsModelsAttribute(m);
        if (attribute != null) return "Immutable." + extractIterableFromValue(attribute.Value) + "<Models." + extractTypeFromValue(attribute.Value) + ">";
        return "<NOT FOUND! List?<Model.?>>";
    }
    string iterableType(Method m)
    {
        var attribute = getReturnsPocosAttribute(m);
        if (attribute != null) return "Immutable." + extractIterableFromValue(attribute.Value);
        attribute = getReturnsModelsAttribute(m);
        if (attribute != null) return "Immutable." + extractIterableFromValue(attribute.Value);
        return "<NOT FOUND! List!?>";
    }
    
    string fullType(Parameter p)
    {
        var typeString = getInnerType(p.Type);
        var attribute = getTypescriptIterableAttribute(p);
        if (attribute != null) typeString = "Immutable." + extractIterableFromTypescriptIterableTypeValue(attribute.Value) + "<" + typeString + ">";
        return typeString;
    }
    string innerType(Method m)
    {
        var attribute = getReturnsPocoAttribute(m);
        if (attribute != null) return attribute.Value;
        attribute = getReturnsPocosAttribute(m);
        if (attribute != null) return extractTypeFromValue(attribute.Value);
        attribute = getReturnsModelAttribute(m);
        if (attribute != null) return "Models." + extractTypeFromValue(attribute.Value);
        attribute = getReturnsModelsAttribute(m);
        if (attribute != null) return "Models." + extractTypeFromValue(attribute.Value);
        return "<NOT FOUND! Model.?>";
    }
    string getObsoleteWarning(Class c)
    {
        var attribute = getObsoleteAttribute(c);
        if (attribute == null) return string.Empty;
        return "console.warn(`" + extractObsoleteMessage(attribute.Value ?? "", serviceName(c)) + "`);";
    }
    string getObsoleteWarning(Method m)
    {
        var attribute = getObsoleteAttribute(m);
        if (attribute == null) return string.Empty;
        return "console.warn(`" + extractObsoleteMessage(attribute.Value ?? "", m.name) + "`);";
    }
    Attribute getTypescriptIterableAttribute(Parameter p) { return getAttributeByName(p.Attributes, "TypescriptIterableType"); }
    Attribute getReturnsVoidAttribute(Method m) { return getAttributeByName(m.Attributes, "ReturnsVoid"); }
    Attribute getReturnsPocoAttribute(Method m) { return getAttributeByName(m.Attributes, "ReturnsPoco"); }
    Attribute getReturnsHeaderOnlyAttribute(Method m) { return getAttributeByName(m.Attributes, "ReturnsHeaderOnly"); }
    Attribute getReturnsPocosAttribute(Method m) { return getAttributeByName(m.Attributes, "ReturnsPocos"); }
    Attribute getReturnsModelAttribute(Method m) { return getAttributeByName(m.Attributes, "ReturnsModel"); }
    Attribute getReturnsModelsAttribute(Method m) { return getAttributeByName(m.Attributes, "ReturnsModels"); }
    Attribute getObsoleteAttribute(Class c) { return getAttributeByName(c.Attributes, "Obsolete"); }
    Attribute getObsoleteAttribute(Method m) { return getAttributeByName(m.Attributes, "Obsolete"); }
    bool returnsVoid(Method m) { return getReturnsVoidAttribute(m) != null; }
    bool returnsPoco(Method m) { return getReturnsPocoAttribute(m) != null; }
    bool returnsHeaderOnly(Method m) { return getReturnsHeaderOnlyAttribute(m) != null; }
    bool returnsPocos(Method m) { return getReturnsPocosAttribute(m) != null; }
    bool returnsModel(Method m) { return getReturnsModelAttribute(m) != null; }
    bool returnsModels(Method m) { return getReturnsModelsAttribute(m) != null; }
    bool isObsolete(Class c) { return getObsoleteAttribute(c) != null; }
    bool isObsolete(Method m) { return getObsoleteAttribute(m) != null; }
}$Classes(c => c.Namespace == "BugTracker.App.Controllers" && c.Name.EndsWith("Controller"))[import * as Immutable from 'immutable';
import { Injectable } from "angular2/core";
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { Http, Headers } from 'angular2/http';
import * as Parser from '../../utils/model/parser';
import * as Models from '../../models/models';
import * as ServiceBase from '../service.base';

@Injectable()
export class $serviceName {
    constructor(private http: Http) {$isObsolete[
        $getObsoleteWarning
    ][
    ]}
    $Methods[public $name($Parameters[$name: $fullType][, ]): $returnsVoid[ServiceBase.IPromise][$returnsHeaderOnly[ServiceBase.ITypedPromise<Headers>][ServiceBase.ITypedPromise<$fullType>]] {$isObsolete[
        $getObsoleteWarning
        ][
        ]
        return this.http
            .request(`$Url`, {
                method: "$HttpMethod",
                body: ServiceBase.stringifyBody($RequestData)
            })$returnsPoco[
            .map<$fullType>(response => {
                return response.json();
            })]$returnsHeaderOnly[
            .map<Headers>(response => {
                return response.headers;
            })]$returnsVoid[
            .map(response => {
                return null;
            })]$returnsPocos[
            .map<$fullType>(response => {
                var models = $fullType(response.json());
                return models;
            })]$returnsModel[
            .map<$fullType>(response => {
                var model = Parser.createModelFromPoco<$fullType>($innerType, response.json());
                return model;
            })]$returnsModels[
            .map<$fullType>(response => {
                var models = Parser.createModelsFromPoco<$fullType, $innerType>($iterableType, $innerType, response.json());
                return models;
            })]
            .toPromise();
    }][
    ]
}]