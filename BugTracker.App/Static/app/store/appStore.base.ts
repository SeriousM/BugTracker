import { List } from 'immutable';

export interface IAction<T> {
    type: T;
}
export class IReducerAppState {
    currentUser: (state: any, action: any) => any;
    users: (state: any, action: any) => any;
    issues: (state: any, action: any) => any;
}
export class AppState {
    public currentUser: CurrentUserState;
    public users: List<UserModel> = List<UserModel>();
    public issues: List<IssueModel> = List<IssueModel>();
    constructor() { }
}
export class UserModel {
    constructor(public name: string) { }
}
export class IssueModel {
    constructor(public title: string) { }
}
export class CurrentUserState {
    public isSet: boolean;
    constructor(public user?: UserModel) {
        this.isSet = user != null;
    }
}