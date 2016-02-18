import { Record } from 'immutable';
import { ImplementsModel, ImplementsModelList, ImplementsMethod, ImplementsProperty } from './storeModels.meta';

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
    name: string,
    setName(value: string): UserModel
}
const UserModelRecord = Record(<IUserModel>{
    name: <string>null
});
@ImplementsModel(UserModelRecord)
export class UserModel extends UserModelRecord implements IUserModel {
    @ImplementsProperty() public name: string;

    @ImplementsMethod()
    public setName(value: string): UserModel {
        return <UserModel>this.set(getVariableName(() => this.name), value);
    }

    constructor(name: string) {
        super({ name });
    }
}

interface IIssueModel {
    title: string,
    setTitle(value: string): IssueModel
}
const IssueModelRecord = Record(<IIssueModel>{
    title: <string>null
});
@ImplementsModel(IssueModelRecord)
export class IssueModel extends IssueModelRecord implements IIssueModel {
    @ImplementsProperty() public title: string;

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
    user: UserModel,
    setUser(value?: UserModel): CurrentUserState
}
const CurrentUserStateRecord = Record(<ICurrentUserState>{
    isSet: <boolean>null,
    user: <UserModel>null
});
@ImplementsModel(CurrentUserStateRecord)
export class CurrentUserState extends CurrentUserStateRecord implements ICurrentUserState {
    @ImplementsProperty() public isSet: boolean;
    @ImplementsModel(UserModel) public user: UserModel;

    @ImplementsMethod()
    public setUser(value?: UserModel): CurrentUserState {
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