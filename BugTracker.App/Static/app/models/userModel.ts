
import { Record } from 'immutable';
import { getVariableName } from '../utils/reflection';
import { ImplementsClass, ImplementsModel, ImplementsModels, ImplementsPoco } from '../utils/model/meta';



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

