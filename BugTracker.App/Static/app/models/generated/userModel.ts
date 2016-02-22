import * as Immutable from 'immutable';
import * as ModelMeta from '../../utils/model/meta';
import * as Models from '../models';

interface IUserModel {
    id: string;
    firstname: string;
    lastname: string;
    setId(id: string): UserModel;
    setFirstname(firstname: string): UserModel;
    setLastname(lastname: string): UserModel;
}

const UserModelRecord = Immutable.Record(<IUserModel>{
    id: <string>null,
    firstname: <string>null,
    lastname: <string>null
});

@ModelMeta.ImplementsClass(UserModelRecord)
export class UserModel extends UserModelRecord implements IUserModel {
    @ModelMeta.ImplementsPoco() public id: string;
    @ModelMeta.ImplementsPoco() public firstname: string;
    @ModelMeta.ImplementsPoco() public lastname: string;
    public setId(id: string): UserModel {
        return <UserModel>this.set("id", id);
    }
    public setFirstname(firstname: string): UserModel {
        return <UserModel>this.set("firstname", firstname);
    }
    public setLastname(lastname: string): UserModel {
        return <UserModel>this.set("lastname", lastname);
    }
    constructor() {
        super({});
    }
}