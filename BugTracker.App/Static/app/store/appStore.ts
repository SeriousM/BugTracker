import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import { default as createLogger } from 'redux-logger';
import { Injectable } from "angular2/core";
import { Record } from "immutable";
import { ReduxStore } from "angular2-redux-store";

import { userStoreReducer } from "../features/users/userStoreReducers";
import { issueStoreReducer } from "../features/issues/issueStoreReducers";
import { currentUserStoreReducer } from "../features/currentUser/currentuserStoreReducers";

import { IReducerAppState, AppState, UserModel } from "./appStore.base";

const logger = createLogger({
    // this transforms the state into a representable object. important to convert immutables with "object.toJS()".
    stateTransformer: (state:AppState) => {
        return {
            currentUser: state.currentUser,
            users: state.users,
            issues: state.issues
        }
    }
});

const createStoreWithMiddleware = applyMiddleware(logger)(createStore);

var reducerAppState : IReducerAppState = {
    currentUser: currentUserStoreReducer,
    users: userStoreReducer,
    issues: issueStoreReducer
}
var finalReducer = combineReducers(reducerAppState);

var initialState = <AppState>{};

var reduxDevTools:any = (<any>window).devToolsExtension;

var finalCreateStore = compose(
    applyMiddleware(logger),
    reduxDevTools != null ? reduxDevTools() : (f:any) => f()
)(createStore);

var appStore = finalCreateStore(finalReducer, initialState);

@Injectable()
export class AppStore extends ReduxStore {
    constructor(){
        super(appStore);
    }
    public getState():AppState{
        return super.getState();
    }
}