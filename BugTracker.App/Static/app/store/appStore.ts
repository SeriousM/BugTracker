import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import { default as createLogger } from 'redux-logger';
import { Injectable } from "angular2/core";
import { ReduxStore } from "angular2-redux-store";

import { userStoreReducer } from "../features/users/store/userStoreReducers";
import { issueStoreReducer } from "../features/issues/store/issueStoreReducers";
import { currentUserStoreReducer } from "../features/currentUser/store/currentuserStoreReducers";

import { IReducerAppState, AppState } from "./appStore.base";

export const appStoreFactory = () => {
    const logger = createLogger({
        // this transforms the state into a representable object. important to convert immutables with "object.toJS()".
        stateTransformer: (state: AppState) => {
            return {
                currentUser: state.currentUser.toJS(),
                users: state.users.toJS(),
                issues: state.issues.toJS()
            }
        }
    });

    const createStoreWithMiddleware = applyMiddleware(logger)(createStore);

    var reducerAppState: IReducerAppState = {
        currentUser: currentUserStoreReducer,
        users: userStoreReducer,
        issues: issueStoreReducer
    }
    var finalReducer = combineReducers(reducerAppState);

    var initialState = <AppState>{};

    var reduxDevTools: any = (<any>window).devToolsExtension;

    var finalCreateStore = compose(
        applyMiddleware(logger),
        reduxDevTools != null ? reduxDevTools() : (f: any) => f()
    )(createStore);

    var appStore = finalCreateStore(finalReducer, initialState);
    
    return new AppStore(appStore);
}

export class AppStore extends ReduxStore {
    constructor(appStore: AppStore) {
        super(appStore);
    }
    public getState(): AppState {
        return super.getState();
    }
}