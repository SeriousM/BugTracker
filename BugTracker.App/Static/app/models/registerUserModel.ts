
import { Record } from 'immutable';
import { getVariableName } from '../utils/reflection';
import { ImplementsClass, ImplementsModel, ImplementsModels, ImplementsPoco } from '../utils/model/meta';



interface IRegisterUserModel {
    
    // $LoudName
    username: string;
    
}

const RegisterUserModelRecord =  Record (<IRegisterUserModel>{
    
    // $LoudName
    username: <string>null
});

@ImplementsClass(RegisterUserModelRecord)
export class RegisterUserModel extends RegisterUserModelRecord implements IRegisterUserModel {
    
        @ImplementsPoco() public username: string;
    

    
        
        public setUsername(username: string): string {
            return <string>this.set("username", username);
        }
    

    constructor() {
        super();
    }
}

