import { Iterable } from 'immutable';
import { getDecorator, ITypedObjectIndex } from '../utils/reflection';

export interface IHasMetaImplements {
    __metaImplements?: IMetaImplements;
}

export interface IMetaImplements {
    classConstructor: IMetaImplementsClassConstructor;
    properties: ITypedObjectIndex<IMetaImplementsProperty>;
}

export interface IMetaImplementsClassConstructor extends Function, IHasMetaImplements {

}

export type IterableFunction = (...args:any[]) => Iterable<any, any>;

export interface IMetaImplementsProperty {
    name: string,
    getClassConstructor: () => IMetaImplementsClassConstructor,
    isList: boolean,
    isPoco: boolean,
    iterableFunction: IterableFunction
}

function setMetaDataIfMissing(maybeHasMetaImplements: IHasMetaImplements) {
    if (!maybeHasMetaImplements.__metaImplements) {
        maybeHasMetaImplements.__metaImplements = {
            classConstructor: null,
            properties: {}
        }
    }
}

export function ImplementsClass(Class: Function) {
    return (...args: any[]) => getDecorator(
        (constructor: Function): Function | void => {
            // class
        
            var hasMetaImplements: IHasMetaImplements = constructor.prototype;
            setMetaDataIfMissing(hasMetaImplements);
            hasMetaImplements.__metaImplements.classConstructor = Class;

            return;
        }, 
        null, 
        null, 
        null, 
        args);
}

export function ImplementsModels(iterableFunction: IterableFunction, getClass: () => Function) {
    return InternalImplementsModel(getClass, iterableFunction);
}

export function ImplementsModel(getClass: () => Function) {
    return InternalImplementsModel(getClass);
}

export function ImplementsPoco() {
    return (...args: any[]) => getDecorator(
        null,
        (prototype: Function, propertyKey: string, descriptor?: TypedPropertyDescriptor<any>): void => {
            // property
        
            var hasMetaImplements: IHasMetaImplements = prototype;
            setMetaDataIfMissing(hasMetaImplements);
            hasMetaImplements.__metaImplements.properties[propertyKey] = {
                name: propertyKey,
                getClassConstructor: null,
                isList: false,
                isPoco: true,
                iterableFunction: null
            };

            return;
        },
        null,
        null,
        args);
}

function InternalImplementsModel(getClass: () => Function, iterableFunction: IterableFunction = null) {
    return (...args: any[]) => getDecorator(
        null, 
        (prototype: Function, propertyKey: string, descriptor?: TypedPropertyDescriptor<any>): void => {
            // property
        
            var hasMetaImplements: IHasMetaImplements = prototype;
            setMetaDataIfMissing(hasMetaImplements);
            hasMetaImplements.__metaImplements.properties[propertyKey] = {
                name: propertyKey,
                getClassConstructor: getClass,
                isList: iterableFunction != null,
                isPoco: false,
                iterableFunction: iterableFunction
            };

            return;
        }, (prototype: Function, propertyKey: string | symbol, descriptor: TypedPropertyDescriptor<any>): TypedPropertyDescriptor<any> | void => {
            // method
            return;
        }, (prototype: Function, propertyKey: string | symbol, parameterIndex: number): void=> {
            // parameter
            return;
        }, args);
}