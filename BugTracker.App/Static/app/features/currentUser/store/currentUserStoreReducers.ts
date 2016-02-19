import { IAction, AppState } from "../../../store/appStore.base";
import { UserModel, CurrentUserState } from "../../../store/storeModels";
import { CurrentUserStoreActionTypes, CurrentUserStoreActions, ISetCurrentUserAction, IRemoveCurrentUserAction } from "./currentUserStoreActions";

function setCurrentUser(state: CurrentUserState, action: ISetCurrentUserAction): CurrentUserState {
    return state.setUser(action.user);
}
function removeCurrentUser(state: CurrentUserState, action: IRemoveCurrentUserAction): CurrentUserState {
    return state.setUser();
}

export function currentUserStoreReducer(state: CurrentUserState = new CurrentUserState(), action: IAction<CurrentUserStoreActions>): CurrentUserState {
    switch (action.type) {
        case CurrentUserStoreActionTypes.SET_CURRENT_USER:
            return setCurrentUser(state, <ISetCurrentUserAction>action);
        case CurrentUserStoreActionTypes.REMOVE_CURRENT_USER:
            return removeCurrentUser(state, <IRemoveCurrentUserAction>action);
        default:
            return state;
    }
}