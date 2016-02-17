import { List, Record } from 'immutable';
import { AppState } from "./appStore.base";
import { IHasMetaImplements, IMetaImplements, IMetaImplementsProperty } from "./storeModels.meta";
import { IObjectIndex } from "../utils/reflection";

var reduxDevTools: any = (<any>window).devToolsExtension;

export function wrapMiddlewareWithRedux(...functions: Function[]) {
    if (reduxDevTools) {
        functions = [
            fixReduxDevToolsState,
            ...functions,
            reduxDevTools()
        ]
    }

    return functions;
}

var assignMissingFunctions = (source: Object, target: Object): void => {
    // TODO
}

function createRecord(propMeta: IMetaImplementsProperty, currentPropValue: any) {
    var propRecord = <Record.Class>propMeta.classConstructor.prototype.__metaImplements.classConstructor;

    var newPropRecord = <IObjectIndex>propRecord(currentPropValue);

    var methodsToApply: Array<string> = propMeta.classConstructor.prototype.__metaImplements.methods;
    methodsToApply.forEach(methodName => {
        newPropRecord[methodName] = propMeta.classConstructor.prototype[methodName];
    });

    return newPropRecord;
}

export const correctStoreState = (currentObject: IObjectIndex, blueprintConstructor: Function): void => {

    var blueprintMeta: IMetaImplements = (<IHasMetaImplements>blueprintConstructor.prototype).__metaImplements;

    var currentProps = Object.getOwnPropertyNames(currentObject);
    for (var index = 0; index < currentProps.length; index++) {
        var currentProp = currentProps[index];

        var propMeta = <IMetaImplementsProperty>blueprintMeta.properties[currentProp];
        if (propMeta == null) {
            throw new Error(`Property '${currentProp}' was not found in the blueprint.`);
        }

        var currentPropValue = currentObject[currentProp];
        if (currentPropValue == null) {
            continue;
        }

        if (Array.isArray(currentPropValue)) {
            var newArray = (<Array<any>>currentPropValue).map(currentArrayValue => {
                return createRecord(propMeta, currentArrayValue);
            });
            currentObject[currentProp] = List(newArray);
        }
        else {
            currentObject[currentProp] = createRecord(propMeta, currentPropValue);
        }
    }

    return;
    
    // var blueprint = {};
    // blueprintFactory.constructor.bind(blueprint)();
    // var allowedProperties = Object.getOwnPropertyNames(blueprint);
    
    // for (var i = 0; i < allowedProperties.length; i++) {
    //     var prop = allowedProperties[i];
        
    //     var currentProp = (<any>current)[prop];

    //     if (currentProp == null) {
    //         continue;
    //     }

    //     if (typeof currentProp == "function") {
    //         // the state shouldn't have functions, but lets assume it... 
    //         continue;
    //     }

    //     var propBlueprint = (<any>blueprint)[prop];

    //     if (Iterable.isIterable(propBlueprint)) {
    //         if (Iterable.isIterable(currentProp)) {
    //             continue;
    //         }
    //         if (List.isList(propBlueprint)) {
    //             currentProp = List(currentProp);
    //         }
    //         else if (Map.isMap(propBlueprint)) {
    //             currentProp = Map(currentProp);
    //         }
    //         else if (Iterable.isIterable(propBlueprint)) {
    //             currentProp = Iterable(currentProp);
    //         }
                
    //         // todo: other conversions for Stack.isStack, OrderedMap.isOrderedMap, Set.isSet, OrderedSet.isOrderedSet, Iterable.isIterable*
                
    //         //assignMissingFunctions(propBlueprint, currentProp);

    //         correctState(currentProp, propBlueprint.constructor.prototype);

    //         (<any>current)[prop] = currentProp;
    //     }
    // }
}

var stateCorrected = false;
var fixReduxDevToolsState = (next: Function) => (reducer: any, initialState: any, enhancer: any) => {
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

        if (!stateCorrected) {
            correctStoreState(state, AppState);
            stateCorrected = true;
        }

        return state;

        // if (Iterable.isIterable(state.currentUser)) {
        //     console.log("!!!YAY!!!");
        // }
        // else {
        //     console.log("!!!NOOOO!!!");
        // }

        // correctState(state, AppState.prototype);

        // if (Iterable.isIterable(state.currentUser)) {
        //     console.log("!!!YAY!!!");
        // }
        // else {
        //     console.log("!!!NOOOO!!!");
        // }

        //             if (!Iterable.isIterable(state.users)) {
        //                 state.users = List<UserModel>(state.users);
        //             }
        // 
        //             if (!Iterable.isIterable(state.issues)) {
        //                 state.issues = List<IssueModel>(state.issues);
        //             }
        
        // todo: dispatch "an unknown action" just that redux-devtools is refreshing 
        // the local storage entry and all subscribers get a fresh version
        
        // return state;
    }

    for (var nextKey in store) {
        newStore[nextKey] = store[nextKey];
    }
    newStore["dispatch"] = newDispatch;
    newStore["getState"] = newGetState;

    return newStore;
};