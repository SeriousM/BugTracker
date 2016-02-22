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
    string getRecordClassName(Class c){return c.Name+"Record";}
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
    bool hasKeyedPropertiesFromModel(Property p)
    {
        return getTypeFromList(p).Properties.Any(x => x.Attributes.FirstOrDefault(a => a.Name == "Key") != null);
    }
    Property[] getKeysPropertiesFromModel(Property p)
    {
        var keyCollection = new List<Property>();
        foreach(var modelProp in getTypeFromList(p).Properties)
        {
            var key = modelProp.Attributes.FirstOrDefault(a => a.Name == "Key");
            if (key != null)
            {
                keyCollection.Add(modelProp);
            }
        }
        return keyCollection.ToArray();
    }
    string getKeysParameterFromModel(Property p)
    {
        var keyCollection = getKeysPropertiesFromModel(p);
        return string.Join(", ", keyCollection.Select(k => k.name + ": " + k.Type));
    }
    string getKeysQueryFromModel(Property p)
    {
        var keyCollection = getKeysPropertiesFromModel(p);
        return string.Join(" && ", keyCollection.Select(k => "item." + k.name + " == " + k.name));
    }
    string getClassName(Class c){return c.Name;}
    string getParentClassName(Property p){return ((Class)p.Parent).Name;}
    string getModelName(Property p){return p.Type.IsPrimitive ? p.Type : "Models." + (p.Type.IsEnumerable ? getTypeFromList(p) : p.Type.Name);}
    bool isNonPrimitiveList(Property p){return !p.Type.IsPrimitive && p.Type.IsEnumerable;}
    string singularCamelCase(Property p) { return p.Type.IsEnumerable ? p.name.Substring(0, p.name.Length -1) : p.name; }
    string singularPascalCase(Property p) { return p.Type.IsEnumerable ? p.Name.Substring(0, p.Name.Length -1) : p.Name; }
}import * as Immutable from 'immutable';
import * as ModelMeta from '../../utils/model/meta';
import * as Models from '../models';

$Classes(c => c.Namespace == "BugTracker.App.Models" && c.Name != "AppState")[interface I$Name {
    $Properties[$name: $getModelTypeRepresentation;][
    ]
    $Properties[set$Name($name: $getModelTypeRepresentation): $getParentClassName;$isNonPrimitiveList[
    add$singularPascalCase($singularCamelCase: $getModelName): $getParentClassName;$hasKeyedPropertiesFromModel[
    remove$singularPascalCase($getKeysParameterFromModel): $getParentClassName;]]][
    ]
}

const $getRecordClassName = Immutable.Record(<I$Name>{
    $Properties[$name: <$getModelTypeRepresentation>$Type[null]][,
    ]
});

@ModelMeta.ImplementsClass($getRecordClassName)
export class $Name extends $getRecordClassName implements I$Name {
    $Properties[$getImplementType public $name: $getModelTypeRepresentation;][
    ]
    $Properties[public set$Name($name: $getModelTypeRepresentation): $getParentClassName {
        return <$getParentClassName>this.set("$name", $name);
    }$isNonPrimitiveList[
    public add$singularPascalCase($singularCamelCase: $getModelName): $getParentClassName {
        var newSet = this.$name.concat($singularCamelCase);
        return <$getParentClassName>this.set$Name(newSet.to$getRawListType());
    }$hasKeyedPropertiesFromModel[
    public remove$singularPascalCase($getKeysParameterFromModel): $getParentClassName {
        var index = this.$name.findIndex(item => $getKeysQueryFromModel);
        if (index < 0) {
            return this;
        }
        var newSet = this.$name.remove(index);
        return <$getParentClassName>this.set$Name(newSet.to$getRawListType());
    }]]][
    ]
    constructor() {
        super({});
    }
}]