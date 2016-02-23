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

@Injectable()
export class DefaultRequestOptions extends BaseRequestOptions {
    headers = new Headers({
        'Content-Type': 'application/json'
    });
}