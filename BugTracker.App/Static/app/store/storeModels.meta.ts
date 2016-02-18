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

export interface IMetaImplementsProperty {
    name: string,
    getClassConstructor: () => IMetaImplementsClassConstructor,
    isList: boolean,
    isPoco: boolean
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
    return InternalImplementsClass(Class);
}

export function ImplementsModelList(Class: Function) {
    return InternalImplementsModel(Class, true);
}

export function ImplementsModel(Class: Function) {
    return InternalImplementsModel(Class, false);
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
                isPoco: true
            };

            return;
        },
        null,
        null,
        args);
}

function InternalImplementsClass(Class: Function) {
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

function InternalImplementsModel(Class: Function, isList: boolean) {
    return (...args: any[]) => getDecorator(
        null, 
        (prototype: Function, propertyKey: string, descriptor?: TypedPropertyDescriptor<any>): void => {
            // property
        
            var hasMetaImplements: IHasMetaImplements = prototype;
            setMetaDataIfMissing(hasMetaImplements);
            hasMetaImplements.__metaImplements.properties[propertyKey] = {
                name: propertyKey,
                getClassConstructor: () => Class,
                isList: isList,
                isPoco: false
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