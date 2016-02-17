import { AppState } from "./appStore.base";

var reduxDevTools: any = (<any>window).devToolsExtension;

export function wrapMiddlewareWithRedux(...functions: Function[]){
    if (reduxDevTools){
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

var correctState = (current: any, blueprintFactory: any): void => {
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
    
    if (stateCorrected) {
        return;
    }
    stateCorrected = true;

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

        // if (Iterable.isIterable(state.currentUser)) {
        //     console.log("!!!YAY!!!");
        // }
        // else {
        //     console.log("!!!NOOOO!!!");
        // }

        correctState(state, AppState.prototype);

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
        
        return state;
    }

    for (var nextKey in store) {
        newStore[nextKey] = store[nextKey];
    }
    newStore["dispatch"] = newDispatch;
    newStore["getState"] = newGetState;

    return newStore;
};