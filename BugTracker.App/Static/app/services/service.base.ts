import { Iterable } from 'immutable';
import { Injectable } from "angular2/core";
import { Headers, BaseRequestOptions } from 'angular2/http';

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

export function stringifyBody(value: Iterable<any, any> | any): string {
    if (value == null) return null;
    if (Iterable.isIterable(value)) {
        value = (<Iterable<any, any>>value).toJS()
    }
    var stringified = JSON.stringify(value);
    return stringified;
}

@Injectable()
export class DefaultRequestOptions extends BaseRequestOptions {
    headers = new Headers({
        'Content-Type': 'application/json'
    });
}