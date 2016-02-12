import { Record, List } from 'immutable';

// http://blog.jhades.org/angular-2-application-architecture-building-flux-like-apps-using-redux-and-immutable-js-js/

// Note: the properties have to be defined as normal public properties, not as public parameters for the constructor.
// Otherwise you will face an "Cannot set on an immutable record." error.

const UserModelRecord = Record({
    name: <string>null
});
export class UserModel extends UserModelRecord {
    public name: string;
    
    constructor(name: string) {
        super({ name });
    }
}

const IssueModelRecord = Record({
    title: <string>null
});
export class IssueModel extends IssueModelRecord {
    public title: string;
    
    constructor(title: string) {
        super({ title });
    }
}

const CurrentUserStateRecord = Record({
    isSet: <boolean>null,
    user: <UserModel>null
});
export class CurrentUserState extends CurrentUserStateRecord {
    public isSet: boolean;
    public user: UserModel;

    constructor(user?: UserModel) {
        super({
            user,
            isSet: user != null
        });
    }
}