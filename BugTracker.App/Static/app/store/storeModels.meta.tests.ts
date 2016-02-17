import { List, Record } from 'immutable';

import { expect, deepFreeze, TestRunnerBase } from "../../test/tests.base";

import { ImplementsModel, ImplementsModelList, ImplementsMethod, ImplementsProperty } from "./storeModels.meta";
import { manipulateModel } from "./appStore.redux";

export class StoreModelsMetaTests extends TestRunnerBase {
    empty() {
        var localStorageState = {};
        var expectedCorrectedState = {};
        manipulateModel(localStorageState, TestAppState);

        var modifiedLocalStorageState = <TestAppState><any>localStorageState;
        expect(modifiedLocalStorageState).toEqual(expectedCorrectedState);
    }
    propertyValueOnRecordExists() {
        var localStorageState = { model: { name: "Bob" } };
        var expectedCorrectedState = { model: LevelOneModelRecord({ name: "Bob" }) };
        manipulateModel(localStorageState, TestAppState);

        var modifiedLocalStorageState = <TestAppState><any>localStorageState;
        expect(modifiedLocalStorageState).toEqual(expectedCorrectedState);
    }
    modelMethodOnRecordExists() {
        var localStorageState = { model: {} };
        var expectedCorrectedState = { model: LevelOneModelRecord({}) };
        manipulateModel(localStorageState, TestAppState);

        var modifiedLocalStorageState = <TestAppState><any>localStorageState;
        expect(modifiedLocalStorageState.model.getName).toExist();
    }
    modelMethodOnRecordReturnsCorrectValue() {
        var localStorageState = { model: { name: "Bob" } };
        var expectedCorrectedState = { model: LevelOneModelRecord({ name: "Bob" }) };
        manipulateModel(localStorageState, TestAppState);
        
        var modifiedLocalStorageState = <TestAppState><any>localStorageState;
        expect(modifiedLocalStorageState.model.getName()).toEqual("Bob");
    }
    emptyListOfModels() {
        var localStorageState = { models: <Array<any>>[] };
        var expectedCorrectedState = { models: List<LevelOneModel>() };
        manipulateModel(localStorageState, TestAppState);

        var modifiedLocalStorageState = <TestAppState><any>localStorageState;
        expect(modifiedLocalStorageState).toEqual(expectedCorrectedState);
        expect(modifiedLocalStorageState.models.count()).toEqual(0);
    }
    ignoreIterables() {
        var localStorageState = { models: List<LevelOneModel>() };
        var expectedCorrectedState = { models: List<LevelOneModel>() };
        manipulateModel(localStorageState, TestAppState);

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
        manipulateModel(localStorageState, TestAppState);

        var modifiedLocalStorageState = <TestAppState><any>localStorageState;
        expect(modifiedLocalStorageState).toEqual(expectedCorrectedState);
        expect(modifiedLocalStorageState.models.get(0).name).toEqual("Bob");
        expect(modifiedLocalStorageState.models.get(1).name).toEqual("Sally");
    }
    propertyValueOnRecordInRecordExists(){
        var localStorageState = { model: { model: {name:"Bob"} } };
        var expectedCorrectedState = { model: LevelOneModelRecord({ model: LevelOneModelRecord({ name: "Bob" }) }) };
        manipulateModel(localStorageState, TestAppState);
        
        var modifiedLocalStorageState = <TestAppState><any>localStorageState;
        expect(modifiedLocalStorageState).toEqual(expectedCorrectedState);
    }
    modelMethodOnRecordInRecordExists() {
        var localStorageState = { model: { model: {name:"Bob"} } };
        var expectedCorrectedState = { model: LevelOneModelRecord({ model: LevelOneModelRecord({ name: "Bob" }) }) };
        manipulateModel(localStorageState, TestAppState);

        var modifiedLocalStorageState = <TestAppState><any>localStorageState;
        expect(modifiedLocalStorageState.model.model.getName).toExist();
    }
    modelMethodOnRecordInRecordReturnsCorrectValue() {
        var localStorageState = { model: { model: {name:"Bob"} } };
        var expectedCorrectedState = { model: LevelOneModelRecord({ model: LevelOneModelRecord({ name: "Bob" }) }) };
        manipulateModel(localStorageState, TestAppState);
        
        var modifiedLocalStorageState = <TestAppState><any>localStorageState;
        expect(modifiedLocalStorageState.model.model.getName()).toEqual("Bob");
    }
    listOfModelsInModels() {
        var localStorageState = { models: [ { models: [
            { name: "Bob" }, { name: "Sally" }
        ] } ] };
        var expectedCorrectedState = { models: List<LevelOneModel>([ LevelOneModelRecord({ models: List<LevelOneModel>([
            LevelOneModelRecord({ name: "Bob" }), LevelOneModelRecord({ name: "Sally" })
        ]) }) ]) };
        manipulateModel(localStorageState, TestAppState);

        var modifiedLocalStorageState = <TestAppState><any>localStorageState;
        expect(modifiedLocalStorageState).toEqual(expectedCorrectedState);
        expect(modifiedLocalStorageState.models.get(0).models.get(0).name).toEqual("Bob");
        expect(modifiedLocalStorageState.models.get(0).models.get(1).name).toEqual("Sally");
    }
}

interface ILevelOneModel {
    name: string
    model: LevelOneModel;
    models: List<LevelOneModel>;
}
const LevelOneModelRecord = Record(<ILevelOneModel>{
    name: <string>null,
    model: <LevelOneModel>null,
    models: <List<LevelOneModel>>null
});
@ImplementsModel(LevelOneModelRecord)
class LevelOneModel extends LevelOneModelRecord {
    @ImplementsProperty() public name: string;
    @ImplementsModel(LevelOneModel) public model: LevelOneModel;
    @ImplementsModelList(LevelOneModel) public models: List<LevelOneModel>;

    @ImplementsMethod()
    public getName() {
        return this.name;
    }

    constructor(name: string) {
        super({ name });
    }
}

class TestAppState {
    @ImplementsModel(LevelOneModel) public model: LevelOneModel;
    @ImplementsModelList(LevelOneModel) public models: List<LevelOneModel>;
}