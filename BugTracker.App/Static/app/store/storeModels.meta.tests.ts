import { List, Record } from 'immutable';

import { expect, deepFreeze, TestRunnerBase } from "../../test/tests.base";

import { Implements, ImplementsList, ImplementsMethod } from "./storeModels.meta";
import { correctStoreState } from "./appStore.redux";

export class StoreModelsMetaTests extends TestRunnerBase {
    empty() {
        var localStorageState = {};
        var expectedCorrectedState = {};
        correctStoreState(localStorageState, TestAppState);

        var modifiedLocalStorageState = <TestAppState><any>localStorageState;
        expect(modifiedLocalStorageState).toEqual(expectedCorrectedState);
    }
    propertyValueOnRecordExists() {
        var localStorageState = { model: { name: "Bob" } };
        var expectedCorrectedState = { model: LevelOneModelRecord({ name: "Bob" }) };
        correctStoreState(localStorageState, TestAppState);

        var modifiedLocalStorageState = <TestAppState><any>localStorageState;
        expect(modifiedLocalStorageState).toEqual(expectedCorrectedState);
    }
    modelMethodOnRecordExists() {
        var localStorageState = { model: {} };
        var expectedCorrectedState = { model: LevelOneModelRecord({}) };
        correctStoreState(localStorageState, TestAppState);

        var modifiedLocalStorageState = <TestAppState><any>localStorageState;
        expect(modifiedLocalStorageState.model.getName).toExist();
    }
    modelMethodOnRecordReturnsCorrectValue() {
        var localStorageState = { model: { name: "Bob" } };
        var expectedCorrectedState = { model: LevelOneModelRecord({ name: "Bob" }) };
        correctStoreState(localStorageState, TestAppState);
        
        var modifiedLocalStorageState = <TestAppState><any>localStorageState;
        expect(modifiedLocalStorageState.model.getName()).toEqual("Bob");
    }
    emptyListOfModels() {
        var localStorageState = { models: <Array<any>>[] };
        var expectedCorrectedState = { models: List<LevelOneModel>() };
        correctStoreState(localStorageState, TestAppState);

        var modifiedLocalStorageState = <TestAppState><any>localStorageState;
        expect(modifiedLocalStorageState).toEqual(expectedCorrectedState);
        expect(modifiedLocalStorageState.models.count()).toEqual(0);
    }
    ignoreIterables() {
        var localStorageState = { models: List<LevelOneModel>() };
        var expectedCorrectedState = { models: List<LevelOneModel>() };
        correctStoreState(localStorageState, TestAppState);

        var modifiedLocalStorageState = <TestAppState><any>localStorageState;
        expect(modifiedLocalStorageState).toEqual(expectedCorrectedState);
        expect(modifiedLocalStorageState.models.count()).toEqual(0);
    }
    listOfModels() {
        var localStorageState = { models: [
            { name: "Bob" }, { name: "Sally" }
        ] };
        var expectedCorrectedState = { models: List<LevelOneModel>([
            LevelOneModelRecord({ name: "Bob" }), LevelOneModelRecord({ name: "Sally" })
        ]) };
        correctStoreState(localStorageState, TestAppState);

        var modifiedLocalStorageState = <TestAppState><any>localStorageState;
        expect(modifiedLocalStorageState).toEqual(expectedCorrectedState);
        expect(modifiedLocalStorageState.models.get(0).name).toEqual("Bob");
        expect(modifiedLocalStorageState.models.get(1).name).toEqual("Sally");
    }
}

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
    @ImplementsList(LevelOneModel) public models: List<LevelOneModel>;
}