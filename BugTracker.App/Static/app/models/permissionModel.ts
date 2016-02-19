
import { Record } from 'immutable';
import { getVariableName } from '../utils/reflection';
import { ImplementsClass, ImplementsModel, ImplementsModels, ImplementsPoco } from '../utils/model/meta';



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

