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
export class CurrentUserState extends CurrentUserStateRecord implements ICurrentUserState, ModelMeta.IClassHasMetaImplements {
    @ModelMeta.ImplementsModel(() => Models.UserModel) public user: Models.UserModel;
    public updateFromModel(updateObject: ICurrentUserStateUpdate): CurrentUserState {
        return <CurrentUserState>this.withMutations(map => ModelBase.updateFromModel(map, updateObject));
    }
    public setUser(user: Models.UserModel): CurrentUserState {
        return <CurrentUserState>this.set("user", user);
    }
    constructor(initialObject?: ICurrentUserStateUpdate = {}) {
        super(initialObject);
    }
}