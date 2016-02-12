import { IAction, UserModel } from "../../../store/appStore.base";

const actionPrefix = "CURRENT_USER.";
export class CurrentUserStoreActionTypes {
    public static SET_CURRENT_USER = actionPrefix + "SET_CURRENT_USER";
    public static REMOVE_CURRENT_USER = actionPrefix + "REMOVE_CURRENT_USER";
}
export class CurrentUserStoreActions {
    public static SetCurrentUser = (user:UserModel) : ISetCurrentUserAction => {
        if (user == null){
            user = <UserModel>{};
        }
        return {type: CurrentUserStoreActionTypes.SET_CURRENT_USER, user: user};
    }
    public static RemoveCurrentUser = () : IAction<CurrentUserStoreActionTypes> => {
        return {type: CurrentUserStoreActionTypes.REMOVE_CURRENT_USER};
    }
}
export interface ISetCurrentUserAction extends IAction<CurrentUserStoreActionTypes>{
    user:UserModel;
}
export interface IRemoveCurrentUserAction extends IAction<CurrentUserStoreActionTypes>{
}