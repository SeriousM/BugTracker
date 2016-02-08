import { createStore } from "redux";
import { Injectable } from "angular2/core";
import { Record } from "immutable";
import { ReduxStore } from "angular2-redux-store";
import { userStoreReducer } from "./userStoreReducers";

var userStore = createStore(userStoreReducer, {users: []});

@Injectable()
export class UserStore extends ReduxStore {
    constructor(){
        super(userStore);
    }
}