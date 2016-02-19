import { Iterable, Record } from 'immutable';
import { IHasMetaImplements, IMetaImplements, IMetaImplementsClassConstructor, IMetaImplementsProperty, IterableFunction } from "./meta";
import { IObjectIndex } from "../reflection";

export function createModelFromPoco<T extends IMetaImplementsClassConstructor>(blueprintConstructor: T, currentObject: Object): T {
    var propMeta: IMetaImplementsProperty = {
        name: "",
        getClassConstructor: () => blueprintConstructor,
        isList: false,
        isPoco: false,
        iterableFunction: null
    }
    var model = createModelOrModels("", currentObject, propMeta);
    return model;
}

export function createModelsFromPoco<T extends IMetaImplementsClassConstructor>(iterableFunction: IterableFunction, blueprintConstructor: T, currentArray: Object[]): T {
    var propMeta: IMetaImplementsProperty = {
        name: "",
        getClassConstructor: () => blueprintConstructor,
        isList: true,
        isPoco: false,
        iterableFunction: iterableFunction
    }
    var model = createModelOrModels("", currentArray, propMeta);
    return model;
}

function createModelOrModels(propName: string, propValue: any, propMeta: IMetaImplementsProperty) {
    var propClass = <IMetaImplementsClassConstructor>propMeta.getClassConstructor();
    var propClassProto = <IHasMetaImplements>propClass.prototype;
    var propRecord = <Record.Class>propClassProto.__metaImplements.classConstructor;

    if (propMeta.isList) {
        var newArray = (<Array<any>>propValue).map(currentArrayValue => {
            return createModel(propName, currentArrayValue, propMeta);
        });
        var newList = propMeta.iterableFunction(newArray);
        return newList;
    }
    else {
        var model = createModel(propName, propValue, propMeta);
        return model;
    }
}

function createModel(propName: string, propValue: any, propMeta: IMetaImplementsProperty) {
    var propClass = <IMetaImplementsClassConstructor>propMeta.getClassConstructor();
    var propClassProto = <IHasMetaImplements>propClass.prototype;
    var propRecord = <Record.Class>propClassProto.__metaImplements.classConstructor;
    
    // create for each property on the object a propper model if possible
    manipulateModel(propValue, propMeta.getClassConstructor());

    // create an instance of the target model
    var model = Object.create(propClassProto);
    // run the record-method on the model to populate it with the existing values from the poco
    propRecord.call(model, propValue);

    return model;
}

export function manipulateModel(currentObject: IObjectIndex, blueprintConstructor: Function): void {

    var blueprintMeta: IMetaImplements = (<IHasMetaImplements>blueprintConstructor.prototype).__metaImplements;

    if (blueprintMeta == null) {
        return;
    }

    var currentProps = Object.getOwnPropertyNames(currentObject);
    for (var index = 0; index < currentProps.length; index++) {
        var currentProp = currentProps[index];

        var propMeta = <IMetaImplementsProperty>blueprintMeta.properties[currentProp];
        if (propMeta == null) {
            throw new Error(`Property '${currentProp}' was not found in the blueprint.`);
        }

        if (propMeta.isPoco) {
            continue;
        }

        var currentPropValue = currentObject[currentProp];
        if (currentPropValue == null ||
            Iterable.isIterable(currentPropValue)) {
            continue;
        }

        if (Array.isArray(currentPropValue) && !propMeta.isList) {
            throw new Error(`Property '${currentProp}' is an array but shouldn't be one regarding to the blueprint.`);
        }
        if (!Array.isArray(currentPropValue) && propMeta.isList) {
            throw new Error(`Property '${currentProp}' isn't an array but should be one regarding to the blueprint.`);
        }

        currentObject[currentProp] = createModelOrModels(currentProp, currentPropValue, propMeta);
    }
}