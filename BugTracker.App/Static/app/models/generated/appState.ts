import * as Immutable from 'immutable';
import * as ModelMeta from '../../utils/model/meta';
import * as Models from '../models';
import * as ModelBase from '../models.base';

export interface IReducerGeneratedAppState {
    users: (state: any, action: any) => any;
    issues: (state: any, action: any) => any;
    currentUser: (state: any, action: any) => any;
}

export class GeneratedAppState implements ModelMeta.IClassHasMetaImplements {
    @ModelMeta.ImplementsModels(Immutable.List, () => Models.UserModel) public users: Immutable.List<Models.UserModel>;
    @ModelMeta.ImplementsModels(Immutable.List, () => Models.IssueModel) public issues: Immutable.List<Models.IssueModel>;
    @ModelMeta.ImplementsModel(() => Models.CurrentUserState) public currentUser: Models.CurrentUserState;
}