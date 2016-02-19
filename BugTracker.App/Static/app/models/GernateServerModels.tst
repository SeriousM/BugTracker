${
    // Enable extension methods by adding using Typewriter.Extensions.*
    using Typewriter.Extensions.Types;   

    // Uncomment the constructor to change template settings.
    //Template(Settings settings)
    //{
    //    settings.IncludeProject("Project.Name");
    //    settings.OutputExtension = ".tsx";
    //}

    // Custom extension methods can be used in the template by adding a $ prefix e.g. $LoudName
    string GetRecordPropertyName(Class classname)
    {
        return classname+"Record";
    }

    string getListType (Property property)
    {
        Attribute attribute = property.Attributes.FirstOrDefault(a => a.Name.Equals("TypescriptListType"));
        if (attribute != null)
        {
            return attribute.Value;
        }
        return "";
    }

    string getImplemntType (Property property)
    {
        if (property.Type.IsPrimitive)
        {
            return "@ImplementsPoco()";
        }
        else if (!property.Type.IsPrimitive && property.Type.IsEnumerable)
        {
            return "@ImplementsModelList()";
        }
        else if (!property.Type.IsPrimitive && !property.Type.IsEnumerable)
        {
            return "@ImplementsModel()";
        }
        return "---";
    }
}

module BugTracker.App.Static.models {

    // $Classes/Enums/Interfaces(filter)[template][separator]
    // filter (optional): Matches the name or full name of the current item. * = match any, wrap in [] to match attributes or prefix with : to match interfaces or base classes.
    // template: The template to repeat for each matched item
    // separator (optional): A separator template that is placed between all templates e.g. $Properties[public $name: $Type][, ]

    // More info: http://frhagn.github.io/Typewriter/
    
    $Classes(*Model)[

    interface I$Name {
        $Properties[
        // $LoudName
        $name: $Type;
        ]
    }

    const $GetRecordPropertyName =  Record (<I$Name>{
        $Properties[
        // $LoudName
        $name: <$Type>$Type[$Default]][, ]
    });

    @ImplementsClass($GetRecordPropertyName)
    export class $Name extends $GetRecordPropertyName implements I$Name {
        $Properties[
            $getImplemntType public $name: $Type;
        ]

        $Properties[
            $getListType
            public set$Name($name: $Type): $Type {
                return <$Type>this.set("$name", $name);
            }
        ]

        constructor() {
            super();
        }
    }
    ]
}



${
/*module BugTracker.App.Static.models {

    // $Classes/Enums/Interfaces(filter)[template][separator]
    // filter (optional): Matches the name or full name of the current item. * = match any, wrap in [] to match attributes or prefix with : to match interfaces or base classes.
    // template: The template to repeat for each matched item
    // separator (optional): A separator template that is placed between all templates e.g. $Properties[public $name: $Type][, ]

    // More info: http://frhagn.github.io/Typewriter/

    

    interface IUserModel {
        
        // $LoudName
        firstname: string;
        
        // $LoudName
        lastname: string;
        
        // $LoudName
        permissions: List<PermissionModel>;

        //methods
        setFirstName(value: string);
        setLastName(value: string);
        setPermissions(value: List<PermissionModel>) : UserModel;
        addPermission(value: PermissionModel): UserModel;
        removePermission(key1: string, ....): UserModel;
    }

    const UserModelRecord =  Record (<IUserModel>{
        
        // $LoudName
        firstname: <string>null, 
        // $LoudName
        lastname: <string>null, 
        // $LoudName
        permissions: <List<PermissionModel>>null
    });

    @ImplementsClass(UserModelRecord)
    export class UserModel extends UserModelRecord implements IUserModel {
        
            @ImplementsPoco() public firstname: string;
        
            @ImplementsPoco() public lastname: string;
        
            @ImplementsModelList() public permissions: List<PermissionModel>;
        

        
            public setFirstname(firstname: string): string {
                return <string>this.set("firstname", firstname);
            }
        
            public setLastname(lastname: string): string {
                return <string>this.set("lastname", lastname);
            }
        
            public setPermissions(permissions: List<PermissionModel>): UserModel {
                return <UserModel>this.set("permissions", permissions);
            }
        
            public removePermission(key1: string): UserModel {
                var foundIndex = this.permissions.indexOf((permission) => return permission.key1 == key1);
                if (foundIndex < 0) {
                    return this;
                }
                var newList = this.permissions.removeAt(foundIndex);
                return this.setPermissions(newList);
            }

            public addPermission(value: PermissionModel): UserModel {                
                var newList = this.permissions.push(value);
                return this.setPermissions(newList);
            }


        constructor() {
            super({});
        }
    }
    
}*/
}