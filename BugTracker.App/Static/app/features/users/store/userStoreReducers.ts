import { List } from 'immutable';

import { IAction, AppState } from "../../../store/appStore.base";
import { UserModel } from "../../../store/storeModels";
import { UserStoreActionTypes, IAddUserAction, IRemoveUserAction } from "./userStoreActions";

function addUser(state: List<UserModel>, action: IAddUserAction): List<UserModel> {
    var newState = state.push(new UserModel(action.userName))
    return newState;
}
function removeUser(state: List<UserModel>, action: IRemoveUserAction): List<UserModel> {
    var newState = state.slice(0, action.indexOfUserToRemove).concat(state.slice(action.indexOfUserToRemove + 1)).toList();
    return newState;
}

export function userStoreReducer(state: List<UserModel> = List<UserModel>(), action: IAction<UserStoreActionTypes>): List<UserModel> {
    switch (action.type) {
        case UserStoreActionTypes.ADD_USER:
            return addUser(state, <IAddUserAction>action);
        case UserStoreActionTypes.REMOVE_USER:
            return removeUser(state, <IRemoveUserAction>action);
        default:
            return state;
    }
}