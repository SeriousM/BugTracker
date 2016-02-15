import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import { default as createLogger } from 'redux-logger';
import { Injectable } from "angular2/core";
import { ReduxStore } from "angular2-redux-store";
import { Record, Iterable, List, Map } from 'immutable';

import 'reflect-metadata'; // imports "Reflect" object

import { userStoreReducer } from "../features/users/store/userStoreReducers";
import { issueStoreReducer } from "../features/issues/store/issueStoreReducers";
import { currentUserStoreReducer } from "../features/currentUser/store/currentuserStoreReducers";

import { IReducerAppState, AppState } from "./appStore.base";
import { UserModel, IssueModel, CurrentUserState } from "./storeModels";

export const appStoreFactory = () => {
    const logger = createLogger({
        // this transforms the state into a representable object. important to convert immutables with "object.toJS()".
        stateTransformer: (state: AppState) => {
            return {
                currentUser: state.currentUser,//.toJS(),
                users: state.users,//.toJS(),
                issues: state.issues,//.toJS()
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

    var assignMissingFunctions = (source: Object, target: Object): void => {
        // TODO
    }

    var correctState = (current: any, blueprintFactory: any): void => {
        var blueprint = {};
        blueprintFactory.constructor.bind(blueprint)();
        var allowedProperties = Object.getOwnPropertyNames(blueprint);
        
        for (var i = 0; i < allowedProperties.length; i++) {
            var prop = allowedProperties[i];
            
            var currentProp = (<any>current)[prop];

            if (currentProp == null) {
                continue;
            }

            if (typeof currentProp == "function") {
                // the state shouldn't have functions, but lets assume it... 
                continue;
            }
    
            var propBlueprint = (<any>blueprint)[prop];

            if (Iterable.isIterable(propBlueprint)) {
                if (Iterable.isIterable(currentProp)) {
                    continue;
                }
                if (List.isList(propBlueprint)) {
                    currentProp = List(currentProp);
                }
                else if (Map.isMap(propBlueprint)) {
                    currentProp = Map(currentProp);
                }
                else if (Iterable.isIterable(propBlueprint)) {
                    currentProp = Iterable(currentProp);
                }
                    
                // todo: other conversions for Stack.isStack, OrderedMap.isOrderedMap, Set.isSet, OrderedSet.isOrderedSet, Iterable.isIterable*
                    
                assignMissingFunctions(propBlueprint, currentProp);

                correctState(currentProp, propBlueprint.constructor.prototype);

                (<any>current)[prop] = currentProp;
            }
        }
    }

    var fixReduxDevToolsState = (next: Function) => (reducer: any, initialState: any, enhancer: any) => {

        // init state area

        const store = next(reducer, initialState, enhancer);

        var newStore = Object(store);
        var oldDispatch = store.dispatch;
        var oldGetState = store.getState;

        var newDispatch = (action: any) => {
            console.info("before action: " + action.type);
            oldDispatch(action);
            console.info("after action: " + action.type);
            return action;
        }

        var newGetState = () => {
            var state = <AppState>oldGetState();

            if (Iterable.isIterable(state.currentUser)) {
                console.log("!!!YAY!!!");
            }
            else {
                console.log("!!!NOOOO!!!");
            }

            correctState(state, AppState.prototype);

            if (Iterable.isIterable(state.currentUser)) {
                console.log("!!!YAY!!!");
            }
            else {
                console.log("!!!NOOOO!!!");
            }

            //             if (!Iterable.isIterable(state.users)) {
            //                 state.users = List<UserModel>(state.users);
            //             }
            // 
            //             if (!Iterable.isIterable(state.issues)) {
            //                 state.issues = List<IssueModel>(state.issues);
            //             }
            
            // todo: dispatch "an unknown action" just that redux-devtools is refreshing 
            // the local storage entry and all subscribers get a fresh version
            
            return state;
        }

        for (var nextKey in store) {
            newStore[nextKey] = store[nextKey];
        }
        newStore["dispatch"] = newDispatch;
        newStore["getState"] = newGetState;

        return newStore;
    };


    var finalCreateStore = compose(
        fixReduxDevToolsState,
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