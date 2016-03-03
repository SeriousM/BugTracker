import * as Immutable from 'immutable';
import * as ModelMeta from '../../utils/model/meta';
import * as Models from '../models';
import * as ModelBase from '../models.base';

export interface IUserModelUpdate {
    id?: string;
    name?: string;
}

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
export class UserModel implements IUserModel, ModelMeta.IClassHasMetaImplements {
    private _record: Immutable.Map<string, any>;
    @ModelMeta.ImplementsPoco() public get id(): string {
        return this._record.get('id');
    }
    @ModelMeta.ImplementsPoco() public get name(): string {
        return this._record.get('name');
    }
    public updateFromModel(updateObject: IUserModelUpdate): UserModel {
        var newRecord = this._record.withMutations(map => ModelBase.updateFromModel(map, updateObject));
        return new UserModel(newRecord);
    }
    public getUpdateModel(): IUserModelUpdate {
        return <IUserModelUpdate> this._record.toJS();
    }
    public setId(id: string): UserModel {
        return new UserModel(this._record.set('id', id));
    }
    public setName(name: string): UserModel {
        return new UserModel(this._record.set('name', name));
    }
    
    constructor(initialObject?: IUserModelUpdate) {
        if (initialObject === null || initialObject === void 0) {
            initialObject = {};
        }
        else {
            if (initialObject instanceof UserModelRecord) {
                ModelBase.extendModelWithRecord(this, initialObject);
                return;
            }
            if (!ModelBase.isPlainObject(initialObject)) {
                ModelBase.riseModelInitializationWithNonPlainObjectError('UserModel');
            }
        }
        ModelBase.extendModelWithRecord(this, initialObject, UserModelRecord);
    }

    /** Getter of the property. Setting this property will throw an error because the model is immutable. Use setId(...) instead. */
    public set id(value: string) { ModelBase.riseImmutableModelError('UserModel', 'id', 'setId'); }
    /** Getter of the property. Setting this property will throw an error because the model is immutable. Use setName(...) instead. */
    public set name(value: string) { ModelBase.riseImmutableModelError('UserModel', 'name', 'setName'); }
    public toJSON() {
        return {
            id: this.id,
            name: this.name
        }
    }
}