${
    // $Classes/Enums/Interfaces(filter)[template][separator]
    // filter (optional): Matches the name or full name of the current item. * = match any, wrap in [] to match attributes or prefix with : to match interfaces or base classes.
    // template: The template to repeat for each matched item
    // separator (optional): A separator template that is placed between all templates e.g. $Properties[public $name: $Type][, ]

    // More info: http://frhagn.github.io/Typewriter/

    // Enable extension methods by adding using Typewriter.Extensions.*
    using Typewriter.Extensions.Types;
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
    Type getGroundlyingModelType(Type t)
    {
        if (t.IsEnumerable) { return t.TypeArguments.First(); }
        return t;
    }
    string getRawListType(Property property)
    {
        // note: the name is "TypescriptListType" even the type is "TypescriptListTypeAttribute"!
        Attribute attribute = property.Attributes.FirstOrDefault(a => a.Name.Equals("TypescriptIterableType"));
        if (attribute != null)
        {
            // "value" of the content is "BugTracker.App.Attributes.TypescriptIterable.List" where "List" is chooseable
            return attribute.Value.Substring("BugTracker.App.Attributes.TypescriptIterable.".Length);
        }
        throw new Exception("Attribute TypescriptIterableType must be applied on list properties.");
    }
    string getListType(Property property) { return "Immutable." + getRawListType(property); }
    string getModelTypeRepresentation(Property p)
    {
        var t = getGroundlyingModelType(p.Type);
        var typescriptType = t.Name;
        if (t.IsPrimitive) { return typescriptType; }
        typescriptType = "Models." + typescriptType;
        if (p.Type.IsEnumerable) { typescriptType = getListType(p) + "<" + typescriptType + ">"; }
        return typescriptType;
    }
    Type getTypeFromList(Property p){if (p.Type.IsEnumerable){return p.Type.TypeArguments.First();}throw new Exception("Type " + p + " is not a list");}
    string getModelName(Property p){return p.Type.IsPrimitive ? p.Type : "Models." + (p.Type.IsEnumerable ? getTypeFromList(p) : p.Type.Name);}
    string getImplementType(Property property)
    {
        if (property.Type.IsPrimitive)
        {
            return "@ModelMeta.ImplementsPoco()";
        }
        else
        {
            if (property.Type.IsEnumerable)
            {
                return "@ModelMeta.ImplementsModels("+getListType(property)+", () => Models."+getTypeFromList(property)+")";
            }
            else
            {
                return "@ModelMeta.ImplementsModel(() => "+getModelName(property)+")";
            }
        }
        throw new Exception("Cannot annotate the property " + property);
    }
}import * as Immutable from 'immutable';
import * as ModelMeta from '../../utils/model/meta';
import * as Models from '../models';

$Classes(c => c.Namespace == "BugTracker.App.Models" && c.Name == "AppState")[export interface IReducer$Name {
    $Properties(p => p.HasSetter)[$name: (state: any, action: any) => any;][
    ]
}

export class $Name implements ModelMeta.IClassHasMetaImplements {
    $Properties(p => p.HasSetter)[$getImplementType public $name: $getModelTypeRepresentation;][
    ]
}]