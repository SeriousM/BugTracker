import { AppConfiguration } from '../config/config.base';
import { Headers, BaseRequestOptions, RequestOptionsArgs, RequestOptions } from 'angular2/http';
import { Injectable } from "angular2/core";

@Injectable()
export class DefaultRequestOptions extends BaseRequestOptions {

    constructor(private config: AppConfiguration) {
        super();
    }

    headers = new Headers({
        'Content-Type': 'application/json'
    });

    merge(options?: RequestOptionsArgs): RequestOptions {
        options.url = this.config.baseApiUrl + options.url;
        return super.merge(options);
    }
}