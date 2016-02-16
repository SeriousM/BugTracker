import { Record, List } from 'immutable';
import 'reflect-metadata'; // imports "Reflect" object

// http://blog.jhades.org/angular-2-application-architecture-building-flux-like-apps-using-redux-and-immutable-js-js/

// Note: the properties have to be defined as normal public properties, not as public parameters for the constructor.
// Otherwise you will face an "Cannot set on an immutable record." error.

var varExtractor = new RegExp("return (?:[_]?this\.)?(.*);");
function getVariableName<TResult>(name: () => TResult) {
    var m = varExtractor.exec(name + "");
    if (m == null) throw new Error("The function does not contain a statement matching 'return variableName;'");
    return m[1];
}

// http://blog.wolksoftware.com/decorators-metadata-reflection-in-typescript-from-novice-to-expert-part-4

declare type ClassDecorator = <TFunction extends Function>(constructor: TFunction) => TFunction | void;
declare type PropertyDecorator = (target: Object, propertyKey: string | symbol, descriptor?: TypedPropertyDescriptor<any>) => void;
declare type MethodDecorator = <T>(target: Object, propertyKey: string | symbol, descriptor: TypedPropertyDescriptor<T>) => TypedPropertyDescriptor<T> | void;
declare type ParameterDecorator = (target: Object, propertyKey: string | symbol, parameterIndex: number) => void;

function getDecorator(
    classDecorator: ClassDecorator,
    propertyDecorator: PropertyDecorator,
    methodDecorator: MethodDecorator,
    parameterDecorator: ParameterDecorator,
    args: any[]) {
    switch (args.length) {
        case 1:
            return classDecorator ? classDecorator.apply(this, args) : null;
        case 2:
            return propertyDecorator ? propertyDecorator.apply(this, args) : null;
        case 3:
            if (typeof args[2] === "number") {
                return parameterDecorator ? parameterDecorator.apply(this, args) : null;
            }
            if (typeof args[2] === null || !args[2].value) {
                // for some reason, the typescript playground returns 3 arguments, not two.
                // therefore we treat this behavior as well.
                return propertyDecorator ? propertyDecorator.apply(this, args) : null;
            }
            return methodDecorator ? methodDecorator.apply(this, args) : null;
        default:
            throw new Error("Decorators are not valid here!");
    }
}

export function Implements(Class: Function) {
    return (...args: any[]) => getDecorator(
        (constructor: Function): Function | void => {
            // class
            return constructor;
        }, (target: Object, propertyKey: string | symbol, descriptor?: TypedPropertyDescriptor<any>): void => {
            // property
            return;
        }, (target: Function, propertyKey: string | symbol, descriptor: TypedPropertyDescriptor<any>): TypedPropertyDescriptor<any> | void => {
            // method
            return descriptor;
        }, (target: Object, propertyKey: string | symbol, parameterIndex: number): void=> {
            // parameter
            return;
        }, args);
}

interface IUserModel {
    name: string
}
export const UserModelRecord = Record(<IUserModel>{
    name: <string>null
});
@Implements(UserModelRecord)
export class UserModel extends UserModelRecord implements IUserModel {
    public name: string;

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
export const IssueModelRecord = Record(<IIssueModel>{
    title: <string>null
});
@Implements(IssueModelRecord)
export class IssueModel extends IssueModelRecord implements IIssueModel {
    public title: string;

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
export const CurrentUserStateRecord = Record(<ICurrentUserState>{
    isSet: <boolean>null,
    user: <UserModel>null
});
@Implements(CurrentUserStateRecord)
export class CurrentUserState extends CurrentUserStateRecord implements ICurrentUserState {
    public isSet: boolean;
    @Implements(UserModel) public user: UserModel;

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