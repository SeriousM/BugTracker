import { Iterable } from 'immutable';
import { getDecorator, ITypedObjectIndex } from '../app/utils/reflection';

export interface IHasMetaTests {
    __metaTests?: IMetaTests;
}

export interface IMetaTests {
    tests: string[];
}

function setMetaDataIfMissing(maybeHasMetaImplements: IHasMetaTests) {
    if (!maybeHasMetaImplements.__metaTests) {
        maybeHasMetaImplements.__metaTests = {
            tests: []
        }
    }
}

function getModelName(Class: Function) {
    var funcNameRegex = /function (.{1,})\(/;
    var results = (funcNameRegex).exec(Class.toString());
    return (results && results.length > 1) ? results[1] : "";
};

export function TestFixture(constructor: Function): void {

    var hasMetaTests: IHasMetaTests = constructor.prototype;
    setMetaDataIfMissing(hasMetaTests);

    return;
}

export function Test(prototype: Object, propertyKey: string, descriptor: TypedPropertyDescriptor<any>): void {

    var hasMetaTests: IHasMetaTests = prototype;
    setMetaDataIfMissing(hasMetaTests);

    hasMetaTests.__metaTests.tests.push(propertyKey);

    return;
}