import { createStore } from "redux";
import { Injectable } from "angular2/core";
import { Record } from "immutable";
import { ReduxStore } from "angular2-redux-store";
import { Actions } from "./userActions";

export const userStoreReducer = (state:any = {}, action:any) => {
    switch (action.type) {
        case Actions.ADD_USER:
            var newState = { 
                users: state.users.concat({name: action.newUser.name})
            };
            return newState;
        case Actions.REMOVE_USER:
            var newState = { 
                users: state.users.slice(0, action.userToRemoveIndex).concat(state.users.slice(action.userToRemoveIndex + 2))
            };
            return newState;
        default:
            return state;
    }
}

var userStore = createStore(userStoreReducer, {users: []});

@Injectable()
export class UserStore extends ReduxStore {
    constructor(){
        super(userStore);
    }
}