import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import { default as createLogger } from 'redux-logger';
import { Injectable } from "angular2/core";
import { ReduxStore } from "angular2-redux-store";

import { userStoreReducer } from "../features/users/store/userStoreReducers";
import { issueStoreReducer } from "../features/issues/store/issueStoreReducers";
import { currentUserStoreReducer } from "../features/currentUser/store/currentUserStoreReducers";

import { IReducerAppState, AppState } from "../models/models";
import { IModelWithRecord } from '../utils/model/meta';
import { wrapMiddlewareWithRedux } from "./appStore.redux";

export function appStoreFactory() {
    const logger = createLogger({
        // this transforms the state into a representable object. important to convert immutables with "object.toJS()".
        stateTransformer: (state: AppState) => {
            return {
                currentUser: (<IModelWithRecord><any>state.currentUser)._record.toJS(),
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

    // the object sent as initial state has to be of type Object, not of type AppStore.
    // therefore we just execute the constructor of the AppStore on a plain object.
    var initialAppStore = {};
    AppState.call(initialAppStore);
    var initialState = <AppState>initialAppStore;

    var finalCreateStore = compose(...wrapMiddlewareWithRedux(
        applyMiddleware(logger)
    ))(createStore);

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