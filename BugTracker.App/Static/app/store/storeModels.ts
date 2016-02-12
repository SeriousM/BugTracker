import { Record, List } from 'immutable';

// http://blog.jhades.org/angular-2-application-architecture-building-flux-like-apps-using-redux-and-immutable-js-js/

const UserModelRecord = Record({
    name: <string>null
});
export class UserModel extends UserModelRecord {
    constructor(public name: string) {
        super({ name });
    }
}

const IssueModelRecord = Record({
    title: <string>null
});
export class IssueModel extends IssueModelRecord {
    constructor(public title: string) {
        super({ title });
    }
}

const CurrentUserStateRecord = Record({
    isSet: <boolean>null,
    user: <UserModel>null
});
export class CurrentUserState extends CurrentUserStateRecord {
    public isSet: boolean;

    constructor(public user?: UserModel) {
        super({
            user,
            isSet: user != null
        });
    }
}