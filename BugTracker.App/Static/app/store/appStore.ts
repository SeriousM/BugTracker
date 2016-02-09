import { createStore } from "redux";
import { Injectable } from "angular2/core";
import { Record } from "immutable";
import { ReduxStore } from "angular2-redux-store";
import { userStoreReducer } from "../features/users/userStoreReducers";

import { AppState, UserModel } from "./appStore.base";

var initialState:AppState = new AppState();
var appStore = createStore(userStoreReducer, initialState);

@Injectable()
export class AppStore extends ReduxStore {
    constructor(){
        super(appStore);
    }
    public getState():AppState{
        return super.getState();
    }
}