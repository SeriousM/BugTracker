import { IAction, AppState, UserModel } from "../../store/appStore.base";
import { UserStoreActionTypes, IAddUserAction, IRemoveUserAction } from "./userStoreActions";

const addUser = (state:Array<UserModel>, action:IAddUserAction) : Array<UserModel> => {
    var newState = state.concat(new UserModel(action.userName))
    return newState;
}
const removeUser = (state:Array<UserModel>, action:IRemoveUserAction) : Array<UserModel> => {
    var newState = state.slice(0, action.indexOfUserToRemove).concat(state.slice(action.indexOfUserToRemove + 1));
    return newState;
}

export const userStoreReducer = (state:Array<UserModel> = [], action:IAction<UserStoreActionTypes>) : Array<UserModel> => {
    switch (action.type) {
        case UserStoreActionTypes.ADD_USER:
            return addUser(state, <IAddUserAction>action);
        case UserStoreActionTypes.REMOVE_USER:
            return removeUser(state, <IRemoveUserAction>action);
        default:
            return state;
    }
}