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
export class RegisterUserModel implements IRegisterUserModel, ModelMeta.IClassHasMetaImplements {
    private _record: Immutable.Map<string, any>;
    @ModelMeta.ImplementsPoco() public get username(): string {
        return this._record.get('username');
    }
    public updateFromModel(updateObject: IRegisterUserModelUpdate): RegisterUserModel {
        var newRecord = this._record.withMutations(map => ModelBase.updateFromModel(map, updateObject));
        return new RegisterUserModel(newRecord);
    }
    public getUpdateModel(): IRegisterUserModelUpdate {
        return <IRegisterUserModelUpdate> this._record.toJS();
    }
    public setUsername(username: string): RegisterUserModel {
        return new RegisterUserModel(this._record.set('username', username));
    }
    
    constructor(initialObject?: IRegisterUserModelUpdate) {
        if (initialObject === null || initialObject === void 0) {
            initialObject = {};
        }
        else {
            if (initialObject instanceof RegisterUserModelRecord) {
                ModelBase.extendModelWithRecord(this, initialObject);
                return;
            }
            if (!ModelBase.isPlainObject(initialObject)) {
                ModelBase.riseModelInitializationWithNonPlainObjectError('RegisterUserModel');
            }
        }
        ModelBase.extendModelWithRecord(this, initialObject, RegisterUserModelRecord);
    }

    /** Getter of the property. Setting this property will throw an error because the model is immutable. Use setUsername(...) instead. */
    public set username(value: string) { ModelBase.riseImmutableModelError('RegisterUserModel', 'username', 'setUsername'); }
}