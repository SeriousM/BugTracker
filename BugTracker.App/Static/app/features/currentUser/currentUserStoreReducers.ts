import { IAction, AppState, UserModel } from "../../store/appStore.base";
import { CurrentUserStoreActionTypes, CurrentUserStoreActions, ISetCurrentUserAction } from "./currentUserStoreActions";

const setCurrentUser = (state:UserModel, action:ISetCurrentUserAction) : UserModel => {
    return action.user;
}

export const currentUserStoreReducer = (state:UserModel, action:IAction<CurrentUserStoreActions>) : UserModel => {
    switch (action.type) {
        case CurrentUserStoreActionTypes.SET_CURRENT_USER:
            return setCurrentUser(state, <ISetCurrentUserAction>action);
        default:
            return state;
    }
}