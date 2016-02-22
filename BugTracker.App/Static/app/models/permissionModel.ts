import * as Immutable from 'immutable';
import { ImplementsClass, ImplementsModel, ImplementsModels, ImplementsPoco } from '../utils/model/meta';
import * as Models from './models';

interface IPermissionModel {
    id: string;
    name: string;
    setId(value: string): PermissionModel;
    setName(value: string): PermissionModel;
}

const PermissionModelRecord = Immutable.Record(<IPermissionModel>{
    id: <string>null,
    name: <string>null
});

@ImplementsClass(PermissionModelRecord)
export class PermissionModel extends PermissionModelRecord implements IPermissionModel {
    @ImplementsPoco() public id: string;
    @ImplementsPoco() public name: string;
    public setId(id: string): PermissionModel {
        return <PermissionModel>this.set("id", id);
    }
    public setName(name: string): PermissionModel {
        return <PermissionModel>this.set("name", name);
    }
    constructor() {
        super({});
    }
}