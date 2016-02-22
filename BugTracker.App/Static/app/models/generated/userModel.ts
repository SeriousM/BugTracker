import * as Immutable from 'immutable';
import { ImplementsClass, ImplementsModel, ImplementsModels, ImplementsPoco } from '../../utils/model/meta';
import * as Models from '../models';

interface IUserModel {
    id: string;
    firstname: string;
    lastname: string;
    permissions: Models.PermissionModel;
    permission: Models.PermissionModel;
    setId(value: string): UserModel;
    setFirstname(value: string): UserModel;
    setLastname(value: string): UserModel;
    setPermissions(value: Models.PermissionModel): UserModel;
    addPermissions(value: Models.PermissionModel): UserModel;
    removePermissions(id: string): UserModel;
    setPermission(value: Models.PermissionModel): UserModel;
}

const UserModelRecord = Immutable.Record(<IUserModel>{
    id: <string>null,
    firstname: <string>null,
    lastname: <string>null,
    permissions: <Models.PermissionModel>null,
    permission: <Models.PermissionModel>null
});

@ImplementsClass(UserModelRecord)
export class UserModel extends UserModelRecord implements IUserModel {
    @ImplementsPoco() public id: string;
    @ImplementsPoco() public firstname: string;
    @ImplementsPoco() public lastname: string;
    @ImplementsModels(Immutable.List, () => Models.PermissionModel) public permissions: Models.PermissionModel;
    @ImplementsModel(() => Models.PermissionModel) public permission: Models.PermissionModel;
    public setId(id: string): UserModel {
        return <UserModel>this.set("id", id);
    }
    public setFirstname(firstname: string): UserModel {
        return <UserModel>this.set("firstname", firstname);
    }
    public setLastname(lastname: string): UserModel {
        return <UserModel>this.set("lastname", lastname);
    }
    public setPermissions(permissions: Models.PermissionModel): UserModel {
        return <UserModel>this.set("permissions", permissions);
    }
    public addPermissions(value: Models.PermissionModel): UserModel {
        var newSet = this.permissions.concat(value);
        return this.setPermissions(newSet);
    }
    public removePermissions(id: string): UserModel {
        var key = this.permissions.findKey(item => item.id == id);
        var newSet = this.permissions.filter((item, itemKey) => itemKey != key);
        return this.setPermissions(newSet);
    }
    public setPermission(permission: Models.PermissionModel): UserModel {
        return <UserModel>this.set("permission", permission);
    }
    constructor() {
        super({});
    }
}