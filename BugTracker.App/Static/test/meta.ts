import { Iterable } from 'immutable';
import { getDecorator, ITypedObjectIndex } from '../app/utils/reflection';

export interface IHasMetaTests {
    __metaTests?: IMetaTests;
}

export interface IMetaTests {
    isTestFixture: boolean;
    tests: string[];
}

function setMetaDataIfMissing(maybeHasMetaImplements: IHasMetaTests) {
    if (!maybeHasMetaImplements.__metaTests) {
        maybeHasMetaImplements.__metaTests = {
            isTestFixture: false,
            tests: []
        }
    }
}

export function TestFixture(constructor: Function): void {

    var hasMetaTests: IHasMetaTests = constructor.prototype;
    setMetaDataIfMissing(hasMetaTests);
    
    hasMetaTests.__metaTests.isTestFixture = true;

    return;
}

export function Test(prototype: Object, propertyKey: string, descriptor: TypedPropertyDescriptor<any>): void {

    var hasMetaTests: IHasMetaTests = prototype;
    setMetaDataIfMissing(hasMetaTests);

    hasMetaTests.__metaTests.tests.push(propertyKey);

    return;
}