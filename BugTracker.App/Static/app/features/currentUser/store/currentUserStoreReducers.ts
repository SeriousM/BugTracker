import { IAction } from "../../../store/appStore.base";
import { AppState, UserModel, CurrentUserState } from "../../../models/models";
import { CurrentUserStoreActionTypes, CurrentUserStoreActions, ISetCurrentUserAction, IRemoveCurrentUserAction } from "./currentUserStoreActions";

function setCurrentUser(state: CurrentUserState, action: ISetCurrentUserAction): CurrentUserState {
    return state.setUser(action.payload.user);
}
function removeCurrentUser(state: CurrentUserState, action: IRemoveCurrentUserAction): CurrentUserState {
    return state.setUser(null);
}

export function currentUserStoreReducer(state: CurrentUserState = new CurrentUserState(), action: IAction): CurrentUserState {
    switch (action.type) {
        case CurrentUserStoreActionTypes.SET_CURRENT_USER:
            return setCurrentUser(state, <ISetCurrentUserAction>action);
        case CurrentUserStoreActionTypes.REMOVE_CURRENT_USER:
            return removeCurrentUser(state, <IRemoveCurrentUserAction>action);
        default:
            return state;
    }
}