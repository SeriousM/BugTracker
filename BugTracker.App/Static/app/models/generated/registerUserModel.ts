import * as Immutable from 'immutable';
import * as ModelMeta from '../../utils/model/meta';
import * as Models from '../models';
import * as ModelBase from '../models.base';

export interface IRegisterUserModelUpdate {
    username?: string;
}

interface IRegisterUserModel {
    username: string;
    setUsername(username: string): RegisterUserModel;
}

const RegisterUserModelRecord = Immutable.Record(<IRegisterUserModel>{
    username: <string>null
});

@ModelMeta.ImplementsClass(RegisterUserModelRecord)
export class RegisterUserModel extends RegisterUserModelRecord implements IRegisterUserModel, ModelMeta.IClassHasMetaImplements {
    @ModelMeta.ImplementsPoco() public username: string;
    public updateFromModel(updateObject: IRegisterUserModelUpdate): RegisterUserModel {
        return <RegisterUserModel>this.withMutations(map => ModelBase.updateFromModel(map, updateObject));
    }
    public setUsername(username: string): RegisterUserModel {
        return <RegisterUserModel>this.set("username", username);
    }
    constructor() {
        super({});
    }
}