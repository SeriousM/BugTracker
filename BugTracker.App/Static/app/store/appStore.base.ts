import { List } from 'immutable';

import { UserModel, IssueModel, CurrentUserState, Implements } from './storeModels';

export interface IAction<T> {
    type: T;
}

export class IReducerAppState {
    currentUser: (state: any, action: any) => any;
    users: (state: any, action: any) => any;
    issues: (state: any, action: any) => any;
}

export class AppState {
    @Implements({ type: CurrentUserState }) public currentUser: CurrentUserState = new CurrentUserState();
    public users: List<UserModel> = List<UserModel>();
    public issues: List<IssueModel> = List<IssueModel>();

    constructor() { }
}