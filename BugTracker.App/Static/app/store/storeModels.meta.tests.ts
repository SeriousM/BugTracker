import { List, Record } from 'immutable';

import { expect, deepFreeze, TestRunnerBase } from "../../test/tests.base";

import { Implements, ImplementsList, ImplementsMethod } from "./storeModels.meta";
import { correctStoreState } from "./appStore.redux";

interface ILevelOneModel {
    name: string
    // model: LevelOneModel;
    // models: List<LevelOneModel>;
}
const LevelOneModelRecord = Record(<ILevelOneModel>{
    name: <string>null
    // ,model: <LevelOneModel>null
    // ,models: <List<LevelOneModel>>null
});
@Implements(LevelOneModelRecord)
class LevelOneModel extends LevelOneModelRecord {
    public name: string;
    // @Implements(LevelOneModel) public model: LevelOneModel;
    // @ImplementsList(LevelOneModel) public models: List<LevelOneModel>;

    @ImplementsMethod()
    public getName() {
        return this.name;
    }

    constructor(name: string) {
        super({ name });
    }
}

class TestAppState {
    @Implements(LevelOneModel) public model: LevelOneModel;
    // @ImplementsList(LevelOneModel) public models: List<LevelOneModel>;
}

export class StoreModelsMetaTests extends TestRunnerBase {
    empty() {
        var localStorageState = {};
        var expectedCorrectedState = {};
        correctStoreState(localStorageState, TestAppState);

        expect(localStorageState).toEqual(expectedCorrectedState);
    }
    propertyValueOnRecordExists() {
        var localStorageState = <TestAppState>{ model: { name: "Bob" } };
        var expectedCorrectedState = { model: LevelOneModelRecord({ name: "Bob" }) };
        correctStoreState(localStorageState, TestAppState);

        expect(localStorageState).toEqual(expectedCorrectedState);
    }
    modelMethodOnRecordExists() {
        var localStorageState = <TestAppState>{ model: {} };
        var expectedCorrectedState = { model: LevelOneModelRecord({}) };
        correctStoreState(localStorageState, TestAppState);

        expect(localStorageState.model.getName).toExist();
    }
    modelMethodOnRecordReturnsCorrectValue() {
        var localStorageState = <TestAppState>{ model: { name: "Bob" } };
        var expectedCorrectedState = { model: LevelOneModelRecord({ name: "Bob" }) };
        correctStoreState(localStorageState, TestAppState);

        expect(localStorageState.model.getName()).toEqual("Bob");
    }
}