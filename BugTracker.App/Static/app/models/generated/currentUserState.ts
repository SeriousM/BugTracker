import * as Immutable from 'immutable';
import * as ModelMeta from '../../utils/model/meta';
import * as Models from '../models';
import * as ModelBase from '../models.base';

export interface ICurrentUserStateUpdate {
    user?: Models.UserModel;
}

interface ICurrentUserState {
    user: Models.UserModel;
    setUser(user: Models.UserModel): CurrentUserState;
}

const CurrentUserStateRecord = Immutable.Record(<ICurrentUserState>{
    user: <Models.UserModel>null
});

@ModelMeta.ImplementsClass(CurrentUserStateRecord)
export class CurrentUserState implements ICurrentUserState, ModelMeta.IClassHasMetaImplements {
    private _record: Immutable.Map<string, any>;
    @ModelMeta.ImplementsModel(() => Models.UserModel) public get user(): Models.UserModel {
        return this._record.get('user');
    }
    public updateFromModel(updateObject: ICurrentUserStateUpdate): CurrentUserState {
        var newRecord = this._record.withMutations(map => ModelBase.updateFromModel(map, updateObject));
        return new CurrentUserState(newRecord);
    }
    public getUpdateModel(): ICurrentUserStateUpdate {
        return <ICurrentUserStateUpdate> this._record.toJS();
    }
    public setUser(user: Models.UserModel): CurrentUserState {
        return new CurrentUserState(this._record.set('user', user));
    }
    
    constructor(initialObject?: ICurrentUserStateUpdate) {
        if (initialObject === null || initialObject === void 0) {
            initialObject = {};
        }
        else {
            if (initialObject instanceof CurrentUserStateRecord) {
                ModelBase.extendModelWithRecord(this, initialObject);
                return;
            }
            if (!ModelBase.isPlainObject(initialObject)) {
                ModelBase.riseModelInitializationWithNonPlainObjectError('CurrentUserState');
            }
        }
        ModelBase.extendModelWithRecord(this, initialObject, CurrentUserStateRecord);
    }

    /** Getter of the property. Setting this property will throw an error because the model is immutable. Use setUser(...) instead. */
    public set user(value: Models.UserModel) { ModelBase.riseImmutableModelError('CurrentUserState', 'user', 'setUser'); }
    public toJSON() {
        return {
            user: this.user
        }
    }
}