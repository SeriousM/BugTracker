import { Iterable } from 'immutable';
import { getDecorator, ITypedObjectIndex } from '../reflection';

export interface IClassHasMetaImplements {
    prototype?: IHasMetaImplements//|Function
}

export interface IHasMetaImplements {
    __metaImplements?: IMetaImplements;
}

export interface IMetaImplements {
    classConstructor: IMetaImplementsClassConstructor;
    properties: ITypedObjectIndex<IMetaImplementsProperty>;
}

export interface IMetaImplementsProperty {
    getClassConstructor: ClassConstructorGetter,
    isList: boolean,
    isPoco: boolean,
    iterableFunction: IterableFunction
}

export interface IMetaImplementsClassConstructor extends IClassHasMetaImplements {
}

export type IterableFunction = (...args: any[]) => Iterable<any, any>;
export type ClassConstructorGetter = (...args: any[]) => IMetaImplementsClassConstructor;

export function getIMetaImplementsProperty(blueprintConstructor: ClassConstructorGetter, isPoco: boolean, iterableFunction: IterableFunction): IMetaImplementsProperty {
    var propMeta: IMetaImplementsProperty = {
        getClassConstructor: blueprintConstructor,
        isList: iterableFunction != null,
        isPoco: isPoco,
        iterableFunction: iterableFunction
    }
    return propMeta;
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

export function ImplementsModels(iterableFunction: IterableFunction, getClass: () => IClassHasMetaImplements) {
    return InternalImplementsModel(getClass, iterableFunction);
}

export function ImplementsModel(getClass: () => IClassHasMetaImplements) {
    return InternalImplementsModel(getClass);
}

export function ImplementsPoco() {
    return (...args: any[]) => getDecorator(
        null,
        (prototype: Function, propertyKey: string, descriptor?: TypedPropertyDescriptor<any>): void => {
            // property
        
            var hasMetaImplements: IHasMetaImplements = prototype;
            setMetaDataIfMissing(hasMetaImplements);
            hasMetaImplements.__metaImplements.properties[propertyKey] = getIMetaImplementsProperty(null, true, null);

            return;
        },
        null,
        null,
        args);
}

function InternalImplementsModel(getClass: ClassConstructorGetter, iterableFunction: IterableFunction = null) {
    return (...args: any[]) => getDecorator(
        null,
        (prototype: Function, propertyKey: string, descriptor?: TypedPropertyDescriptor<any>): void => {
            // property
        
            var hasMetaImplements: IHasMetaImplements = prototype;
            setMetaDataIfMissing(hasMetaImplements);
            hasMetaImplements.__metaImplements.properties[propertyKey] = getIMetaImplementsProperty(getClass, false, iterableFunction);

            return;
        }, (prototype: Function, propertyKey: string | symbol, descriptor: TypedPropertyDescriptor<any>): TypedPropertyDescriptor<any> | void => {
            // method
            return;
        }, (prototype: Function, propertyKey: string | symbol, parameterIndex: number): void=> {
            // parameter
            return;
        }, args);
}