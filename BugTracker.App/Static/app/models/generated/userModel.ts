import * as Immutable from 'immutable';
import * as ModelMeta from '../../utils/model/meta';
import * as Models from '../models';

interface IUserModel {
    id: string;
    name: string;
    setId(id: string): UserModel;
    setName(name: string): UserModel;
}

const UserModelRecord = Immutable.Record(<IUserModel>{
    id: <string>null,
    name: <string>null
});

@ModelMeta.ImplementsClass(UserModelRecord)
export class UserModel extends UserModelRecord implements IUserModel, ModelMeta.IClassHasMetaImplements {
    @ModelMeta.ImplementsPoco() public id: string;
    @ModelMeta.ImplementsPoco() public name: string;
    public setId(id: string): UserModel {
        return <UserModel>this.set("id", id);
    }
    public setName(name: string): UserModel {
        return <UserModel>this.set("name", name);
    }
    constructor() {
        super({});
    }
}