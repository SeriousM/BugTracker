/**
 * The definition of a flux-standard-action. https://github.com/acdlite/flux-standard-action
 */
export interface IAction {
    /** The type of an action identifies to the consumer the nature of the action that has occurred.
     * Two actions with the same type MUST be strictly equivalent (using ===).
     * By convention, type is usually string constant or a Symbol.
     */
    type: string;
    /** 
     * The optional payload property MAY be any type of value. It represents the payload of the action. Any information about the action that is not the type or status of the action should be part of the payload field.
     * By convention, if error is true, the payload SHOULD be an error object. This is akin to rejecting a promise with an error object.
     */
    payload?: any|Error;
    /** The optional meta property MAY be any type of value. It is intended for any extra information that is not part of the payload. */
    meta?: any;
    /**
     * The optional error property MAY be set to true if the action represents an error.
     * An action whose error is true is analogous to a rejected Promise. By convention, the payload SHOULD be an error object.
     * If error has any other value besides true, including undefined and null, the action MUST NOT be interpreted as an error.
     */
    error?: boolean;
}

export function createAction<T extends IAction>(type: string, payload?: any, meta?: any, isError?: boolean): T {
    var action: IAction = {
        type: type,
        payload: payload,
        meta: meta,
        error: isError !== void 0 ? isError : (payload instanceof Error)
    };
    return <T>action;
}