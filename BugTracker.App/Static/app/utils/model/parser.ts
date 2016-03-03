import { Iterable, Record } from 'immutable';
import * as Meta from "./meta";
import { IObjectIndex } from "../reflection";

export function createModelFromPoco<T extends Meta.IMetaImplementsClassConstructor>(blueprintConstructor: Meta.IMetaImplementsClassConstructor, currentObject: Object): T {
    var propMeta = Meta.getIMetaImplementsProperty(() => blueprintConstructor, false, null);
    var model = createModelOrModels(currentObject, propMeta);
    return model;
}

export function createModelsFromPoco<U extends Iterable<any, Meta.IMetaImplementsClassConstructor>, T extends Meta.IMetaImplementsClassConstructor>(iterableFunction: Meta.IterableFunction, blueprintConstructor: Meta.IMetaImplementsClassConstructor, currentArray: Object[]): U {
    var propMeta = Meta.getIMetaImplementsProperty(() => blueprintConstructor, false, iterableFunction);
    var model = createModelOrModels(currentArray, propMeta);
    return model;
}

function createModelOrModels(propValue: any | any[], propMeta: Meta.IMetaImplementsProperty) {
    if (propMeta.isPoco) {
        if (propMeta.isList) {
            var newList = propMeta.iterableFunction(propValue);
            return newList;
        }
        else {
            return propValue;
        }
    }

    var propClassProto = propMeta.getClassConstructor().prototype;
    var propRecord = <Record.Class>propClassProto.__metaImplements.classConstructor;

    if (propMeta.isList) {
        var newArray = propValue.map((currentArrayValue: any) => {
            return createModel(currentArrayValue, propMeta);
        });
        var newList = propMeta.iterableFunction(newArray);
        return newList;
    }
    else {
        var model = createModel(propValue, propMeta);
        return model;
    }
}

function createModel(propValue: any, propMeta: Meta.IMetaImplementsProperty) {
    var propClassProto = propMeta.getClassConstructor().prototype;
    var propRecord = <Record.Class>propClassProto.__metaImplements.classConstructor;

    if ((<Meta.IModelWithRecord>propValue)._record != void 0) {
        // on reduxDevTools commit, the propValue is already manipulated and we just return it as the model.
        return propValue;
    }
    
    // create for each property on the object a propper model if possible
    manipulateModel(propValue, propMeta.getClassConstructor());

    // create an instance of the target model
    var model = Object.create(propClassProto);

    // run the record-method on the model to populate it with the existing values from the poco
    Meta.extendModelWithRecord(model, propValue, propRecord);

    return model;
}

export function manipulateModel(currentObject: IObjectIndex, blueprintConstructor: Meta.IClassHasMetaImplements): void {

    var blueprintMeta: Meta.IMetaImplements = blueprintConstructor.prototype.__metaImplements;

    if (blueprintMeta == null) {
        return;
    }

    var currentProps = Object.getOwnPropertyNames(currentObject);
    for (var index = 0; index < currentProps.length; index++) {
        var currentProp = currentProps[index];

        var propMeta = <Meta.IMetaImplementsProperty>blueprintMeta.properties[currentProp];
        if (propMeta == null) {
            throw new Error(`Property '${currentProp}' was not found in the blueprint.`);
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

        currentObject[currentProp] = createModelOrModels(currentPropValue, propMeta);
    }
}