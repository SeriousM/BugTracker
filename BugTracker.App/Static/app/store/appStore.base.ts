import { List } from 'immutable';

import { UserModel, IssueModel, CurrentUserState } from './storeModels';
import { ImplementsModel, ImplementsModelList } from './storeModels.meta';

export interface IAction<T> {
    type: T;
}

export class IReducerAppState {
    currentUser: (state: any, action: any) => any;
    users: (state: any, action: any) => any;
    issues: (state: any, action: any) => any;
}

export class AppState {
    @ImplementsModel(() => CurrentUserState) public currentUser: CurrentUserState = new CurrentUserState();
    @ImplementsModelList(() => UserModel) public users: List<UserModel> = List<UserModel>();
    @ImplementsModelList(() => IssueModel) public issues: List<IssueModel> = List<IssueModel>();

    constructor() { }
}