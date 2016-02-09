export interface IAction<T>{
    type:T;
}
export interface IAppState{
    users:Array<IUserModel>;
}
export interface IUserModel{
    name:string;
}
export class UserModel implements IUserModel{
    constructor(public name:string){}
}
export class AppState implements IAppState{
    public users:Array<UserModel> = [];
    constructor(){}
}