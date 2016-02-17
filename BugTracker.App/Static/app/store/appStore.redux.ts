import { List, Record } from 'immutable';
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

function createModelRecord(propMeta: IMetaImplementsProperty, currentPropValue: any) {
    var propRecord = <Record.Class>propMeta.classConstructor.prototype.__metaImplements.classConstructor;

    var newPropRecord = <IObjectIndex>propRecord(currentPropValue);

    var methodsToApply: Array<string> = propMeta.classConstructor.prototype.__metaImplements.methods;
    methodsToApply.forEach(methodName => {
        newPropRecord[methodName] = propMeta.classConstructor.prototype[methodName];
    });

    return newPropRecord;
}

export function correctStoreState(currentObject: IObjectIndex, blueprintConstructor: Function): void {

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
                return createModelRecord(propMeta, currentArrayValue);
            });
            currentObject[currentProp] = List(newArray);
        }
        else {
            currentObject[currentProp] = createModelRecord(propMeta, currentPropValue);
        }
    }
}

type ReducerFunction = (state: any, action: IAction<any>) => ReducerFunction;

var stateCorrected = false;
const fixReduxDevToolsState = (BlueprintObject: Function) => (next: Function) => (reducer: ReducerFunction, initialState: any, enhancer: any) => {

    const reduxInit: string = "@@redux/INIT";
    const reduxDevToolsInit: string = "@@INIT";

    var newReducer = (state: any, action: IAction<any>) => {
        if (!stateCorrected && action.type != reduxInit && action.type != reduxDevToolsInit) {
            correctStoreState(state, BlueprintObject);
            stateCorrected = true;
        }

        return reducer(state, action);
    };

    const nextStore = next(newReducer, initialState, enhancer);

    return nextStore;
};