

module BugTracker.App.Static.models {

    // $Classes/Enums/Interfaces(filter)[template][separator]
    // filter (optional): Matches the name or full name of the current item. * = match any, wrap in [] to match attributes or prefix with : to match interfaces or base classes.
    // template: The template to repeat for each matched item
    // separator (optional): A separator template that is placed between all templates e.g. $Properties[public $name: $Type][, ]

    // More info: http://frhagn.github.io/Typewriter/
    
    

    interface IUserModel {
        
        // $LoudName
        id: string;
        
        // $LoudName
        firstname: string;
        
        // $LoudName
        lastname: string;
        
        // $LoudName
        permissions: PermissionModel[];
        
    }

    const UserModelRecord =  Record (<IUserModel>{
        
        // $LoudName
        id: <string>null, 
        // $LoudName
        firstname: <string>null, 
        // $LoudName
        lastname: <string>null, 
        // $LoudName
        permissions: <PermissionModel[]>[]
    });

    @ImplementsClass(UserModelRecord)
    export class UserModel extends UserModelRecord implements IUserModel {
        
            @ImplementsPoco() public id: string;
        
            @ImplementsPoco() public firstname: string;
        
            @ImplementsPoco() public lastname: string;
        
            @ImplementsModelList() public permissions: PermissionModel[];
        

        
            
            public setId(id: string): string {
                return <string>this.set("id", id);
            }
        
            
            public setFirstname(firstname: string): string {
                return <string>this.set("firstname", firstname);
            }
        
            
            public setLastname(lastname: string): string {
                return <string>this.set("lastname", lastname);
            }
        
            
            public setPermissions(permissions: PermissionModel[]): PermissionModel[] {
                return <PermissionModel[]>this.set("permissions", permissions);
            }
        

        constructor() {
            super();
        }
    }
    
}



