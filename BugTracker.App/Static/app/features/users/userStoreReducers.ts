import { IAction, AppState, UserModel } from "../../store/appStore.base";
import { UserStoreActionTypes, IAddUserAction, IRemoveUserAction } from "./userStoreActions";

const addUser = (state:AppState, action:IAddUserAction) : AppState => {
    var newState = new AppState();
    newState.users = state.users.concat(new UserModel(action.userName))
    return newState;
}
const removeUser = (state:AppState, action:IRemoveUserAction) : AppState => {
    var newState = new AppState();
    newState.users = state.users.slice(0, action.indexOfUserToRemove).concat(state.users.slice(action.indexOfUserToRemove + 1));
    return newState;
}

export const userStoreReducer = (state:AppState = new AppState(), action:IAction<UserStoreActionTypes>) : AppState => {
    switch (action.type) {
        case UserStoreActionTypes.ADD_USER:
            return addUser(state, <IAddUserAction>action);
        case UserStoreActionTypes.REMOVE_USER:
            return removeUser(state, <IRemoveUserAction>action);
        default:
            return state;
    }
}