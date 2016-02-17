import { Record } from 'immutable';
import { Implements, ImplementsList, ImplementsMethod } from './storeModels.meta';

// http://blog.jhades.org/angular-2-application-architecture-building-flux-like-apps-using-redux-and-immutable-js-js/

// Note: the properties have to be defined as normal public properties, not as public parameters for the constructor.
// Otherwise you will face an "Cannot set on an immutable record." error.

var varExtractor = new RegExp("return (?:[_]?this\.)?(.*);");
function getVariableName<TResult>(name: () => TResult) {
    var m = varExtractor.exec(name + "");
    if (m == null) throw new Error("The function does not contain a statement matching 'return variableName;'");
    return m[1];
}

interface IUserModel {
    name: string
}
const UserModelRecord = Record(<IUserModel>{
    name: <string>null
});
@Implements(UserModelRecord)
export class UserModel extends UserModelRecord implements IUserModel {
    public name: string;

    @ImplementsMethod()
    public setName(value: string): UserModel {
        return <UserModel>this.set(getVariableName(() => this.name), value);
    }

    constructor(name: string) {
        super({ name });
    }
}

interface IIssueModel {
    title: string
}
const IssueModelRecord = Record(<IIssueModel>{
    title: <string>null
});
@Implements(IssueModelRecord)
export class IssueModel extends IssueModelRecord implements IIssueModel {
    public title: string;

    @ImplementsMethod()
    public setTitle(value: string): IssueModel {
        return <IssueModel>this.set(getVariableName(() => this.title), value);
    }

    constructor(title: string) {
        super({ title });
    }
}

interface ICurrentUserState {
    isSet: boolean,
    user: UserModel
}
const CurrentUserStateRecord = Record(<ICurrentUserState>{
    isSet: <boolean>null,
    user: <UserModel>null
});
@Implements(CurrentUserStateRecord)
export class CurrentUserState extends CurrentUserStateRecord implements ICurrentUserState {
    public isSet: boolean;
    @Implements(UserModel) public user: UserModel;

    @ImplementsMethod()
    public setUser(value: UserModel): CurrentUserState {
        return <CurrentUserState>this.withMutations(map => {
            map.set(getVariableName(() => this.user), value);
            map.set(getVariableName(() => this.isSet), value != null);
        });
    }

    constructor(user?: UserModel) {
        super({
            user,
            isSet: user != null
        });
    }
}