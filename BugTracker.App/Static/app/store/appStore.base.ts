export interface IAction<T>{
    type:T;
}
export class AppState{
    public users:Array<UserModel> = [];
    public issues:Array<IssueModel> = [];
    constructor(){}
}
export class UserModel{
    constructor(public name:string){}
}
export class IssueModel{
    constructor(public title:string){}
}