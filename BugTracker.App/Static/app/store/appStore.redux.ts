import { Iterable, List, Record } from 'immutable';
import { AppState, IAction } from "./appStore.base";
import { IHasMetaImplements, IMetaImplements, IMetaImplementsProperty } from "./storeModels.meta";
import { IObjectIndex } from "../utils/reflection";

var reduxDevTools: any = (<any>window).devToolsExtension;

export function wrapMiddlewareWithRedux(...storeEnhancers: Function[]) {
    if (reduxDevTools) {
        // order of the store enhancers:
        // example: [a,b,c]
        // result: a(b(c(redux-store)))
        // the last one in the list is responsibe to create the original redux-store.
        // the first one is the one faced to the consumer of the store.
        // the first one will get the reducer from the app (original reducers), every folowing the reducer from the previous one.
        // every enhancer gets the reducer function (or combination of them) from the previous enhancer.
        // eg. b(reducer=from a):returns store c
        
        // fixReduxDevToolsState must be at the top so that it can fix the corrupted 'committed' appState from reduxDevTools just before the app's recucer will receive it
        // reduxDevTools must be the last so that it can manage its own state to enable timetravel and so on
        // all other store enhancers come just between
        storeEnhancers = [
            fixReduxDevToolsState(AppState),
            ...storeEnhancers,
            reduxDevTools()
        ]
    }

    return storeEnhancers;
}

function createModelRecord(propName: string, propValue: any, propMeta: IMetaImplementsProperty) {
    var propRecord = <Record.Class>propMeta.classConstructor.prototype.__metaImplements.classConstructor;

    // create for each property on the object a propper model if possible
    manipulateModel(propValue, propMeta.classConstructor);

    function tempConstructor(...args: any[]) {
        propRecord.apply(this, args);
    }
    tempConstructor.prototype = Object.create(propMeta.classConstructor.prototype);
    tempConstructor.prototype.constructor = propRecord;

    var newPropRecord = <IObjectIndex>(new tempConstructor(propValue));

    // var methodsToApply: Array<string> = propMeta.classConstructor.prototype.__metaImplements.methods;
    // methodsToApply.forEach(methodName => {
    //     newPropRecord[methodName] = propMeta.classConstructor.prototype[methodName];
    // });

    return newPropRecord;
}

export function manipulateModel(currentObject: IObjectIndex, blueprintConstructor: Function): void {

    var blueprintMeta: IMetaImplements = (<IHasMetaImplements>blueprintConstructor.prototype).__metaImplements;

    if (blueprintMeta == null) {
        return;
    }

    var currentProps = Object.getOwnPropertyNames(currentObject);
    for (var index = 0; index < currentProps.length; index++) {
        var currentProp = currentProps[index];

        var propMeta = <IMetaImplementsProperty>blueprintMeta.properties[currentProp];
        if (propMeta == null) {
            throw new Error(`Property '${currentProp}' was not found in the blueprint.`);
        }

        if (propMeta.isPoco) {
            continue;
        }

        var currentPropValue = currentObject[currentProp];
        if (currentPropValue == null ||
            propMeta.isPoco ||
            Iterable.isIterable(currentPropValue)) {
            continue;
        }

        if (Array.isArray(currentPropValue) && !propMeta.isList) {
            throw new Error(`Property '${currentProp}' is an array but shouldn't be one regarding to the blueprint.`);
        }
        if (!Array.isArray(currentPropValue) && propMeta.isList) {
            throw new Error(`Property '${currentProp}' isn't an array but should be one regarding to the blueprint.`);
        }

        if (propMeta.isList) {
            var newArray = (<Array<any>>currentPropValue).map(currentArrayValue => {
                return createModelRecord(currentProp, currentArrayValue, propMeta);
            });
            currentObject[currentProp] = List(newArray);
        }
        else {
            currentObject[currentProp] = createModelRecord(currentProp, currentPropValue, propMeta);
        }
    }
}

type ReducerFunction = (state: any, action: IAction<any>) => ReducerFunction;

const fixReduxDevToolsState = (BlueprintObject: Function) => (next: Function) => (reducer: ReducerFunction, initialState: any, enhancer: any) => {

    const reduxInit: string = "@@redux/INIT";
    const reduxDevToolsInit: string = "@@INIT";

    var newReducer = (state: any, action: IAction<any>) => {
        // reduxDevTools will send the init-action multiple times depending on the session setup and during session reset
        // therefore we need to correct the state as often as needed
        
        // the redux init-action on the other hand is not important because it will only send once the configured initial state
        if (action.type == reduxDevToolsInit) {
            manipulateModel(state, BlueprintObject);
        }

        return reducer(state, action);
    };

    const nextStore = next(newReducer, initialState, enhancer);

    return nextStore;
};