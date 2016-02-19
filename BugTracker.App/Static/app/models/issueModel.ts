
import { Record } from 'immutable';
import { getVariableName } from '../utils/reflection';
import { ImplementsClass, ImplementsModel, ImplementsModels, ImplementsPoco } from '../utils/model/meta';



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

