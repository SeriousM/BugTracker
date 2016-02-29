import { Map } from 'immutable';
export { isPlainObject } from '../utils/reflection';
export { extendModelWithRecord } from '../utils/model/meta';

export function updateFromModel(modelMap: Map<string, any>, updateObject: any) {
    for (var key in updateObject) {
        if (updateObject.hasOwnProperty(key)) {
            modelMap.set(key, updateObject[key]);
        }
    }
}

export function riseImmutableModelError(modelName: string, propertyName: string, methodToUseName: string) {
    throw new Error(`${modelName}::${propertyName}: It's not allowed to set properties via assignments on a model. Use '${methodToUseName}(...)' instead.`);
}

export function riseModelInitializationWithBadRecordError(modelName: string, wrongRecordName: string, wantedRecordName: string) {
    throw new Error(`${modelName}: It's not allowed to initialize the model with a ${wrongRecordName} record. A ${wantedRecordName} record is needed.`);
}

export function riseModelInitializationWithNonPlainObjectError(modelName: string) {
    throw new Error(`${modelName}: The model may only be initialized with a plain object.`);
    // note: I know that's not completely true, but initializing the model with the required record is only possible within the model anyway.
}