import { createStore, combineReducers } from "redux";
import { Injectable } from "angular2/core";
import { Record } from "immutable";
import { ReduxStore } from "angular2-redux-store";

import { userStoreReducer } from "../features/users/userStoreReducers";
import { issueStoreReducer } from "../features/issues/issueStoreReducers";

import { AppState, UserModel } from "./appStore.base";

var finalReducer = combineReducers({
    users: userStoreReducer, 
    issues: issueStoreReducer
});

var initialState = <AppState>{};
var appStore = createStore(finalReducer, initialState);

@Injectable()
export class AppStore extends ReduxStore {
    constructor(){
        super(appStore);
    }
    public getState():AppState{
        return super.getState();
    }
}