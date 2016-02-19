

module BugTracker.App.Static.models {

    // $Classes/Enums/Interfaces(filter)[template][separator]
    // filter (optional): Matches the name or full name of the current item. * = match any, wrap in [] to match attributes or prefix with : to match interfaces or base classes.
    // template: The template to repeat for each matched item
    // separator (optional): A separator template that is placed between all templates e.g. $Properties[public $name: $Type][, ]

    // More info: http://frhagn.github.io/Typewriter/
    
    

    interface IIssueModel {
        
        // $LoudName
        userId: string;
        
        // $LoudName
        title: string;
        
        // $LoudName
        content: string;
        
    }

    const IssueModelRecord =  Record (<IIssueModel>{
        
        // $LoudName
        userId: <string>null, 
        // $LoudName
        title: <string>null, 
        // $LoudName
        content: <string>null
    });

    @ImplementsClass(IssueModelRecord)
    export class IssueModel extends IssueModelRecord implements IIssueModel {
        
            @ImplementsPoco() public userId: string;
        
            @ImplementsPoco() public title: string;
        
            @ImplementsPoco() public content: string;
        

        
            
            public setUserId(userId: string): string {
                return <string>this.set("userId", userId);
            }
        
            
            public setTitle(title: string): string {
                return <string>this.set("title", title);
            }
        
            
            public setContent(content: string): string {
                return <string>this.set("content", content);
            }
        

        constructor() {
            super();
        }
    }
    
}



