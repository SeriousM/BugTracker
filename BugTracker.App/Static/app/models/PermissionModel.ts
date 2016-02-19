

module BugTracker.App.Static.models {

    // $Classes/Enums/Interfaces(filter)[template][separator]
    // filter (optional): Matches the name or full name of the current item. * = match any, wrap in [] to match attributes or prefix with : to match interfaces or base classes.
    // template: The template to repeat for each matched item
    // separator (optional): A separator template that is placed between all templates e.g. $Properties[public $name: $Type][, ]

    // More info: http://frhagn.github.io/Typewriter/
    
    

    interface IPermissionModel {
        
        // $LoudName
        name: string;
        
    }

    const PermissionModelRecord =  Record (<IPermissionModel>{
        
        // $LoudName
        name: <string>null
    });

    @ImplementsClass(PermissionModelRecord)
    export class PermissionModel extends PermissionModelRecord implements IPermissionModel {
        
            @ImplementsPoco() public name: string;
        

        
            
            public setName(name: string): string {
                return <string>this.set("name", name);
            }
        

        constructor() {
            super();
        }
    }
    
}



