// http://blog.wolksoftware.com/decorators-metadata-reflection-in-typescript-from-novice-to-expert-part-4

declare type ClassDecorator = <TFunction extends Function>(constructor: TFunction) => TFunction | void;
declare type PropertyDecorator = (prototype: Function, propertyKey: string | symbol, descriptor?: TypedPropertyDescriptor<any>) => void;
declare type MethodDecorator = <T>(prototype: Function, propertyKey: string | symbol, descriptor: TypedPropertyDescriptor<T>) => TypedPropertyDescriptor<T> | void;
declare type ParameterDecorator = (prototype: Function, propertyKey: string | symbol, parameterIndex: number) => void;

export interface IObjectIndex {
    [key: string]: any
}
export interface ITypedObjectIndex<T> extends IObjectIndex {
    [key: string]: T
}

function throwError(message: string) {
    throw new Error(message);
}

export function getDecorator(
    classDecorator: ClassDecorator,
    propertyDecorator: PropertyDecorator,
    methodDecorator: MethodDecorator,
    parameterDecorator: ParameterDecorator,
    args: any[]) {
    switch (args.length) {
        case 1:
            return classDecorator ? classDecorator.apply(this, args) : throwError("This decorator is not allowed on class.");
        case 2:
            return propertyDecorator ? propertyDecorator.apply(this, args) : throwError("This decorator is not allowed on property.");
        case 3:
            if (typeof args[2] === "number") {
                return parameterDecorator ? parameterDecorator.apply(this, args) : throwError("This decorator is not allowed on parameter.");
            }
            if (typeof args[2] === null || !args[2].value) {
                // for some reason, the typescript playground returns 3 arguments, not two.
                // therefore we treat this behavior as well.
                return propertyDecorator ? propertyDecorator.apply(this, args) : throwError("This decorator is not allowed on property.");
            }
            return methodDecorator ? methodDecorator.apply(this, args) : throwError("This decorator is not allowed on method.");
        default:
            throw new Error("Decorators are not valid here!");
    }
}

var varExtractor = new RegExp("return (?:[_]?this\.)?(.*);");
export function getVariableName<TResult>(name: () => TResult) {
    var m = varExtractor.exec(name + "");
    if (m == null) throw new Error("The function does not contain a statement matching 'return variableName;'");
    return m[1];
}

export function isArray(arr: any) {
    return toString.call(arr) == '[object Array]';
};

export function isObject(obj: any) {
    return obj != null && typeof obj === 'object' && !isArray(obj);
};

export function isObjectObject(obj: any) {
    return isObject(obj) === true
        && Object.prototype.toString.call(obj) === '[object Object]';
}

export function isPlainObject(obj: any) {
    var ctor: any, prot: any;

    if (isObjectObject(obj) === false) return false;
  
    // If has modified constructor
    ctor = obj.constructor;
    if (typeof ctor !== 'function') return false;
  
    // If has modified prototype
    prot = ctor.prototype;
    if (isObjectObject(prot) === false) return false;
  
    // If constructor does not have an Object-specific method
    if (prot.hasOwnProperty('isPrototypeOf') === false) {
        return false;
    }
  
    // Most likely a plain Object
    return true;
};