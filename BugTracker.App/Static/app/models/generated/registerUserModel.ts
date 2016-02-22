import * as Immutable from 'immutable';
import { ImplementsClass, ImplementsModel, ImplementsModels, ImplementsPoco } from '../../utils/model/meta';
import * as Models from '../models';

interface IRegisterUserModel {
    username: string;
    setUsername(username: string): RegisterUserModel;
}

const RegisterUserModelRecord = Immutable.Record(<IRegisterUserModel>{
    username: <string>null
});

@ImplementsClass(RegisterUserModelRecord)
export class RegisterUserModel extends RegisterUserModelRecord implements IRegisterUserModel {
    @ImplementsPoco() public username: string;
    public setUsername(username: string): RegisterUserModel {
        return <RegisterUserModel>this.set("username", username);
    }
    constructor() {
        super({});
    }
}