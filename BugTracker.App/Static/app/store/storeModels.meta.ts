import { getDecorator, ITypedObjectIndex } from '../utils/reflection';

export interface IHasMetaImplements {
    __metaImplements?: IMetaImplements;
}

export interface IMetaImplements {
    classConstructor: IMetaImplementsClassConstructor;
    properties: ITypedObjectIndex<IMetaImplementsProperty>;
    methods: Array<string>;
}

export interface IMetaImplementsClassConstructor extends Function, IHasMetaImplements {

}

export interface IMetaImplementsProperty {
    classConstructor: IMetaImplementsClassConstructor,
    isList: boolean
}

function setMetaDataIfMissing(maybeHasMetaImplements: IHasMetaImplements) {
    if (!maybeHasMetaImplements.__metaImplements) {
        maybeHasMetaImplements.__metaImplements = {
            classConstructor: null,
            properties: {},
            methods: []
        }
    }
}

export function ImplementsList(Class: Function) {
    return InternalImplements(Class, true);
}

export function Implements(Class: Function) {
    return InternalImplements(Class, false);
}

export function ImplementsMethod() {
    return (...args: any[]) => getDecorator(
        null,
        null,
        (prototype: Function, propertyKey: string, descriptor: TypedPropertyDescriptor<any>): TypedPropertyDescriptor<any> | void => {
            // method
            
            var hasMetaImplements: IHasMetaImplements = prototype;
            setMetaDataIfMissing(hasMetaImplements);

            if (hasMetaImplements.__metaImplements.methods.indexOf(propertyKey) < 0) {
                hasMetaImplements.__metaImplements.methods.push(propertyKey);
            }

            return;
        },
        null,
        args);
}

function InternalImplements(Class: Function, isList: boolean) {
    return (...args: any[]) => getDecorator(
        (constructor: Function): Function | void => {
            // class
        
            var hasMetaImplements: IHasMetaImplements = constructor.prototype;
            setMetaDataIfMissing(hasMetaImplements);
            hasMetaImplements.__metaImplements.classConstructor = Class;

            return;
        }, (prototype: Function, propertyKey: string | symbol, descriptor?: TypedPropertyDescriptor<any>): void => {
            // property
        
            var hasMetaImplements: IHasMetaImplements = prototype;
            setMetaDataIfMissing(hasMetaImplements);
            hasMetaImplements.__metaImplements.properties[propertyKey] = {
                classConstructor: Class,
                isList: isList
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