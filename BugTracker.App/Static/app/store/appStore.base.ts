export interface IAction<T>{
    type:T;
}
export class UserModel{
    constructor(public name:string){}
}
export class AppState{
    public users:Array<UserModel> = [];
    constructor(){}
}