import { List } from 'immutable';

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