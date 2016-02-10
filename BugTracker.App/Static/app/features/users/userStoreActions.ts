import { IAction } from "../../store/appStore.base";

const actionPrefix = "USERS.";
export class UserStoreActionTypes {
    public static ADD_USER = actionPrefix + "ADD_USER";
    public static REMOVE_USER = actionPrefix + "REMOVE_USER";
}
export class UserStoreActions {
    public static AddUser = (name:string) : IAddUserAction => {
        return {type: UserStoreActionTypes.ADD_USER, userName: name};
    }
    public static RemoveUser = (indexOfUserToRemove:number) : IRemoveUserAction => {
        return {type: UserStoreActionTypes.REMOVE_USER, indexOfUserToRemove : indexOfUserToRemove};
    }
}
export interface IAddUserAction extends IAction<UserStoreActionTypes>{
    userName:string;
}
export interface IRemoveUserAction extends IAction<UserStoreActionTypes>{
    indexOfUserToRemove:number;
}