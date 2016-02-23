import { Map } from 'immutable';
import { IObjectIndex } from '../utils/reflection';

export function updateFromModel(modelMap: Map<string, any>, updateObject: any) {
    for (var key in updateObject) {
        if (updateObject.hasOwnProperty(key)) {
            modelMap.set(key, updateObject[key]);
        }
    }
}