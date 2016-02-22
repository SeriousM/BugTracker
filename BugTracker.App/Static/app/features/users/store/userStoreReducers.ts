import { List } from 'immutable';

import { IAction } from "../../../store/appStore.base";
import { AppState, UserModel } from "../../../models/models";
import { UserStoreActionTypes, IAddUserAction, IRemoveUserAction } from "./userStoreActions";

function addUser(state: List<UserModel>, action: IAddUserAction): List<UserModel> {
    var newState = state.push(new UserModel().setName(action.userName))
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