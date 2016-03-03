import { Iterable } from 'immutable';
import { Injectable } from "angular2/core";

import { IModelWithRecord } from '../utils/model/meta';

export interface ITypedPromise<T> {
    then(success: (data: T) => void, failure?: (error: any) => void): ITypedPromise<T>;
    catch(failure: (error: any) => void): ITypedPromise<T>;
    finally(always: () => void): ITypedPromise<T>;
}

export interface IPromise {
    then(success: () => void, failure?: (error: any) => void): IPromise;
    catch(failure: (error: any) => void): IPromise;
    finally(always: () => void): IPromise;
}

export function stringifyBody(value: Iterable<any, any> | IModelWithRecord | any): string {
    if (value == null) return null;
    if (Iterable.isIterable(value)) {
        value = (<Iterable<any, any>>value).toJS()
    }
    else if ((<IModelWithRecord>value)._record !== void 0) {
        value = (<IModelWithRecord>value)._record.toJS()
    }
    var stringified = JSON.stringify(value);
    return stringified;
}

