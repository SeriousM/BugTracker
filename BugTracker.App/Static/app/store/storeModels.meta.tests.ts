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
    propertyValueOnRecordInRecordWithDifferentModelsExists(){
        var localStorageState = { user: { pet: { name: "Boy" } } };
        var expectedCorrectedState = { user: UserModelRecord({ pet: PetModelRecord({ name: "Boy" }) }) };
        manipulateModel(localStorageState, TestAppState);
        
        var modifiedLocalStorageState = <TestAppState><any>localStorageState;
        expect(modifiedLocalStorageState).toEqual(expectedCorrectedState);
    }
    modelMethodOnRecordInRecordWithDifferentModelsReturnsCorrectValue(){
        var localStorageState = { user: { pet: { name: "Boy" } } };
        var expectedCorrectedState = { user: UserModelRecord({ pet: PetModelRecord({ name: "Boy" }) }) };
        manipulateModel(localStorageState, TestAppState);
        
        var modifiedLocalStorageState = <TestAppState><any>localStorageState;
        expect(modifiedLocalStorageState.user.pet.bark()).toEqual("Boy");
    }
    nestedMethodReturningANewModelHasModelMethods(){
        var localStorageState = { user: { pet: { name: "Boy" } } };
        var expectedCorrectedState = { user: UserModelRecord({ pet: PetModelRecord({ name: "Boy" }) }) };
        manipulateModel(localStorageState, TestAppState);
        
        var modifiedLocalStorageState = <TestAppState><any>localStorageState;
        var newModel = modifiedLocalStorageState.user.pet.transform("Puppy");
        expect(newModel.bark()).toEqual("Puppy");
    }
}

interface ILevelOneModel {
    name: string
    model: LevelOneModel;
    models: List<LevelOneModel>;
    getName(): string;
}
const LevelOneModelRecord = Record(<ILevelOneModel>{
    name: <string>null,
    model: <LevelOneModel>null,
    models: <List<LevelOneModel>>null
});
@ImplementsModel(LevelOneModelRecord)
class LevelOneModel extends LevelOneModelRecord implements ILevelOneModel {
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

// TODO: Attention!! The order of the classes are important 
// because the <ModelType> in @ImplementsModel(<ModelType>) my be undefined if the class is not yet created!!

interface IPetModel{
    name:string,
    transform(name:string):PetModel,
    bark():string
}
const PetModelRecord = Record(<IPetModel>{
    name:<string>null
})
@ImplementsModel(PetModelRecord)
class PetModel extends PetModelRecord implements IPetModel{
    @ImplementsProperty() public name:string;
    @ImplementsMethod() public bark(){
        return this.name;
    }
    @ImplementsMethod() public transform(name:string){
        return <PetModel>this.withMutations(map => {
            map.set("name", name);
        });
    }
}

interface IUserModel{
    name:string,
    pet:PetModel
}
const UserModelRecord = Record(<IUserModel>{
    name:<string>null,
    pet:<PetModel>null
})
@ImplementsModel(UserModelRecord)
class UserModel extends UserModelRecord implements IUserModel{
    @ImplementsProperty() public name:string;
    @ImplementsModel(PetModel) public pet:PetModel;
}

class TestAppState {
    @ImplementsModel(LevelOneModel) public model: LevelOneModel;
    @ImplementsModelList(LevelOneModel) public models: List<LevelOneModel>;
    @ImplementsModel(UserModel) public user: UserModel;
}