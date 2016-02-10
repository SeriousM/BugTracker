import { IAction, UserModel } from "../../store/appStore.base";

export enum CurrentUserStoreActionTypes {
    SET_CURRENT_USER
}
export class CurrentUserStoreActions {
    public static SetCurrentUser = (user:UserModel) : ISetCurrentUserAction => {
        return {type: CurrentUserStoreActionTypes.SET_CURRENT_USER, user: user};
    }
}
export interface ISetCurrentUserAction extends IAction<CurrentUserStoreActions>{
    user:UserModel;
}