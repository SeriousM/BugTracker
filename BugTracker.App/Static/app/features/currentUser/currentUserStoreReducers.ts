import { IAction, AppState, UserModel, CurrentUserState } from "../../store/appStore.base";
import { CurrentUserStoreActionTypes, CurrentUserStoreActions, ISetCurrentUserAction, IRemoveCurrentUserAction } from "./currentUserStoreActions";

const setCurrentUser = (state:CurrentUserState, action:ISetCurrentUserAction) : CurrentUserState => {
    return new CurrentUserState(action.user);
}
const removeCurrentUser = (state:CurrentUserState, action:IRemoveCurrentUserAction) : CurrentUserState => {
    return new CurrentUserState();
}

export const currentUserStoreReducer = (state:CurrentUserState = new CurrentUserState(), action:IAction<CurrentUserStoreActions>) : CurrentUserState => {
    switch (action.type) {
        case CurrentUserStoreActionTypes.SET_CURRENT_USER:
            return setCurrentUser(state, <ISetCurrentUserAction>action);
        case CurrentUserStoreActionTypes.REMOVE_CURRENT_USER:
            return removeCurrentUser(state, <IRemoveCurrentUserAction>action);
        default:
            return state;
    }
}