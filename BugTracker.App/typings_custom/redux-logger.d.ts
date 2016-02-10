// Compiled using typings@0.6.6
// Source: https://raw.githubusercontent.com/DefinitelyTyped/DefinitelyTyped/af415548ef57bee0f0761a3d221f38fe439e8c28/redux-logger/redux-logger.d.ts
// Type definitions for redux-logger v2.0.0
// Project: https://github.com/fcomb/redux-logger
// Definitions by: Alexander Rusakov <https://github.com/arusakov/>
// Definitions: https://github.com/borisyankov/DefinitelyTyped


declare module 'redux-logger' {
    interface ColorsObject {
        title: (action: Object) => string;
        prevState: (prevState: Object) => string;
        action: (action: Object) => string;
        nextState: (nextState: Object) => string;
        error: (error: any, prevState: Object) => string;
    }
    
    /**
     * Documentation: https://github.com/fcomb/redux-logger#options-1
     */
    interface ReduxLoggerOptions {
        /** default: log. Console's level */
        level?: string;
        /** default: false. Print the duration of each action */
        duration?: boolean;
        /** default: true. Print the timestamp with each action */
        timestamp?: boolean;
        /** Object with color getter functions: title, prevState, action, nextState, error. Useful if you want to paint message based on specific state or action. Set any of them to false if you want to show plain message without colors. */
        colors?: ColorsObject;
        /** default: window.console. Implementation of the `console` API. */
        logger?: any;
        /** default: true. Should the logger catch, log, and re-throw errors */
        logErrors?: boolean;
        /** default: false. Takes a boolean or optionally a function that receives `getState` function for accessing current store state and `action` object as parameters. Returns `true` if the log group should be collapsed, `false` otherwise. */
        collapsed?: boolean,
        /** Default: null (always log). If specified this function will be called before each action is processed with this middleware. */
        predicate?: (getState: Function, action: any) => boolean;
        /** Transform state before print. Eg. convert Immutable object to plain JSON. */
        stateTransformer?: (state: Object) => any;
        /** Transform state before print. Eg. convert Immutable object to plain JSON. */
        actionTransformer?: (state: Object) => any;
        /** Transform state before print. Eg. convert Immutable object to plain JSON. */
        errorTransformer?: (state: Object) => any;
    }

    export default function createLogger(options?: ReduxLoggerOptions): Redux.Middleware;
}