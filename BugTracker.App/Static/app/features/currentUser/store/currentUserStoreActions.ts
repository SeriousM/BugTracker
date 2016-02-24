import { IAction, createAction } from "../../../store/appStore.base";
import { UserModel } from "../../../models/models";

const actionPrefix = "CURRENT_USER.";
export class CurrentUserStoreActionTypes {
    public static SET_CURRENT_USER = actionPrefix + "SET_CURRENT_USER";
    public static REMOVE_CURRENT_USER = actionPrefix + "REMOVE_CURRENT_USER";
}
export class CurrentUserStoreActions {
    public static SetCurrentUser = (user: UserModel): ISetCurrentUserAction => {
        if (user == null) {
            user = <UserModel>{};
        }
        return createAction<ISetCurrentUserAction>(CurrentUserStoreActionTypes.SET_CURRENT_USER, { user: user });
    }
    public static RemoveCurrentUser = (): IRemoveCurrentUserAction => {
        return createAction<IRemoveCurrentUserAction>(CurrentUserStoreActionTypes.REMOVE_CURRENT_USER);
    }
}
export interface ISetCurrentUserAction extends IAction {
    payload: { user: UserModel };
}
export interface IRemoveCurrentUserAction extends IAction {
}