///<reference path='../../../node_modules/immutable/dist/immutable.d.ts'/>
///<reference path='../../../node_modules/angular2-redux-store/lib/index.d.ts'/>
import { createStore } from "redux";
import { Injectable } from "angular2/core";
import { Record } from "immutable";
import { ReduxStore } from "angular2-redux-store";
import { Actions } from "./userActions";

export const userStoreReducer = (state:any = {}, action:any) => {
    switch (action.type) {
        case Actions.ADD_USER:
            return state;
        case Actions.REMOVE_USER:
            return state;
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