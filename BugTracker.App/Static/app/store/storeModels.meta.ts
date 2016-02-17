import { getDecorator } from '../utils/reflection';

export interface IHasMetaImplements {
    __metaImplements?: {
        prototype: Function;
        properties: { [key: string]: { prototype: Function, isList: boolean } }
    };
}

function setMetaDataIfMissing(maybeHasMetaImplements: IHasMetaImplements) {
    if (!maybeHasMetaImplements.__metaImplements) {
        maybeHasMetaImplements.__metaImplements = {
            prototype: null,
            properties: {}
        }
    }
}

export function ImplementsList(Class: Function) {
    return InternalImplements(Class, true);
}

export function Implements(Class: Function) {
    return InternalImplements(Class, false);
}

function InternalImplements(Class: Function, isList: boolean) {
    return (...args: any[]) => getDecorator(
        (constructor: Function): Function | void => {
            // class
        
            var hasMetaImplements: IHasMetaImplements = constructor.prototype;
            setMetaDataIfMissing(hasMetaImplements);
            hasMetaImplements.__metaImplements.prototype = Class;

            return;
        }, (target: Object, propertyKey: string | symbol, descriptor?: TypedPropertyDescriptor<any>): void => {
            // property
        
            var hasMetaImplements: IHasMetaImplements = target;
            setMetaDataIfMissing(hasMetaImplements);
            hasMetaImplements.__metaImplements.properties[propertyKey] = {
                prototype: Class,
                isList: isList
            };

            return;
        }, (target: Function, propertyKey: string | symbol, descriptor: TypedPropertyDescriptor<any>): TypedPropertyDescriptor<any> | void => {
            // method
            return;
        }, (target: Object, propertyKey: string | symbol, parameterIndex: number): void=> {
            // parameter
            return;
        }, args);
}