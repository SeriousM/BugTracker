import { AppState, IAction } from "./appStore.base";
import { manipulateModel } from "../utils/model/parser";

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

type ReducerFunction = (state: any, action: IAction<any>) => ReducerFunction;

function fixReduxDevToolsState(BlueprintObject: Function) { 
    return (next: Function) => (reducer: ReducerFunction, initialState: any, enhancer: any) => {

        const reduxInit: string = "@@redux/INIT";
        const reduxDevToolsInit: string = "@@INIT";

        function newReducer(state: any, action: IAction<any>) {
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
    }
}