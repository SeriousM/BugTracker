import { IAction, AppState } from "../../../store/appStore.base";
import { UserModel, CurrentUserState } from "../../../store/storeModels";
import { CurrentUserStoreActionTypes, CurrentUserStoreActions, ISetCurrentUserAction, IRemoveCurrentUserAction } from "./currentUserStoreActions";

const setCurrentUser = (state: CurrentUserState, action: ISetCurrentUserAction): CurrentUserState => {
    return state.setUser(action.user);
}
const removeCurrentUser = (state: CurrentUserState, action: IRemoveCurrentUserAction): CurrentUserState => {
    return state.setUser();
}

export const currentUserStoreReducer = (state: CurrentUserState = new CurrentUserState(), action: IAction<CurrentUserStoreActions>): CurrentUserState => {
    switch (action.type) {
        case CurrentUserStoreActionTypes.SET_CURRENT_USER:
            return setCurrentUser(state, <ISetCurrentUserAction>action);
        case CurrentUserStoreActionTypes.REMOVE_CURRENT_USER:
            return removeCurrentUser(state, <IRemoveCurrentUserAction>action);
        default:
            return state;
    }
}