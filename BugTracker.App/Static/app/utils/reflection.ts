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

export function getDecorator(
    classDecorator: ClassDecorator,
    propertyDecorator: PropertyDecorator,
    methodDecorator: MethodDecorator,
    parameterDecorator: ParameterDecorator,
    args: any[]) {
    switch (args.length) {
        case 1:
            return classDecorator ? classDecorator.apply(this, args) : null;
        case 2:
            return propertyDecorator ? propertyDecorator.apply(this, args) : null;
        case 3:
            if (typeof args[2] === "number") {
                return parameterDecorator ? parameterDecorator.apply(this, args) : null;
            }
            if (typeof args[2] === null || !args[2].value) {
                // for some reason, the typescript playground returns 3 arguments, not two.
                // therefore we treat this behavior as well.
                return propertyDecorator ? propertyDecorator.apply(this, args) : null;
            }
            return methodDecorator ? methodDecorator.apply(this, args) : null;
        default:
            throw new Error("Decorators are not valid here!");
    }
}