import { UserActions } from "./userActions";

export const userStoreReducer = (state:any = {}, action:any) => {
    switch (action.type) {
        case UserActions.ADD_USER:
            var newState = { 
                users: state.users.concat({name: action.newUser.name})
            };
            return newState;
        case UserActions.REMOVE_USER:
            var newState = { 
                users: state.users.slice(0, action.userToRemoveIndex).concat(state.users.slice(action.userToRemoveIndex + 1))
            };
            return newState;
        default:
            return state;
    }
}