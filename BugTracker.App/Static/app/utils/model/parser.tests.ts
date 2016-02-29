import { List, Record, Stack } from 'immutable';

import { expect, deepFreeze, TestRunnerBase, TestFixture, Test } from "../../../test/tests.base";

import { IClassHasMetaImplements, ImplementsClass, ImplementsModel, ImplementsModels, ImplementsPoco, ImplementsPocos } from "./meta";
import { manipulateModel, createModelFromPoco, createModelsFromPoco } from "./parser";

import * as Models from './parser.tests.models';

@TestFixture
export class ModelParserTests extends TestRunnerBase {
    @Test empty() {
        var localStorageState = {};
        var expectedCorrectedState = {};
        manipulateModel(localStorageState, Models.TestAppState);

        var modifiedLocalStorageState = <Models.TestAppState><any>localStorageState;
        expect(modifiedLocalStorageState).toEqual(expectedCorrectedState);
    }
    @Test propertyValueOnRecordExists() {
        var localStorageState = { model: { name: "Bob" } };
        var expectedCorrectedState = { model: new Models.LevelOneModel({name:"Bob"}) };
        manipulateModel(localStorageState, Models.TestAppState);

        var modifiedLocalStorageState = <Models.TestAppState><any>localStorageState;
        expect(modifiedLocalStorageState).toEqual(expectedCorrectedState);
    }
    @Test modelMethodOnRecordExists() {
        var localStorageState = { model: {} };
        var expectedCorrectedState = { model: new Models.LevelOneModel() };
        manipulateModel(localStorageState, Models.TestAppState);

        var modifiedLocalStorageState = <Models.TestAppState><any>localStorageState;
        expect(modifiedLocalStorageState.model.setName).toExist();
    }
    @Test modelMethodOnRecordReturnsCorrectValue() {
        var localStorageState = { model: { name: "Bob" } };
        var expectedCorrectedState = { model: new Models.LevelOneModel({name:"Bob"}) };
        manipulateModel(localStorageState, Models.TestAppState);
        
        var modifiedLocalStorageState = <Models.TestAppState><any>localStorageState;
        expect(modifiedLocalStorageState.model.setName("Sally").name).toEqual("Sally");
    }
    @Test emptyListOfModels() {
        var localStorageState = { models: <any[]>[] };
        var expectedCorrectedState = { models: List<Models.LevelOneModel>() };
        manipulateModel(localStorageState, Models.TestAppState);

        var modifiedLocalStorageState = <Models.TestAppState><any>localStorageState;
        expect(modifiedLocalStorageState).toEqual(expectedCorrectedState);
        expect(modifiedLocalStorageState.models.count()).toEqual(0);
    }
    @Test ignoreIterables() {
        var localStorageState = { models: List<Models.LevelOneModel>() };
        var expectedCorrectedState = { models: List<Models.LevelOneModel>() };
        manipulateModel(localStorageState, Models.TestAppState);

        var modifiedLocalStorageState = <Models.TestAppState><any>localStorageState;
        expect(modifiedLocalStorageState).toEqual(expectedCorrectedState);
        expect(modifiedLocalStorageState.models.count()).toEqual(0);
    }
    @Test listOfModels() {
        var localStorageState = { models: [
            { name: "Bob" }, { name: "Sally" }
        ] };
        var expectedCorrectedState = { models: List<Models.LevelOneModel>([
            new Models.LevelOneModel({name:"Bob"}), new Models.LevelOneModel({name:"Sally"})
        ]) };
        manipulateModel(localStorageState, Models.TestAppState);

        var modifiedLocalStorageState = <Models.TestAppState><any>localStorageState;
        expect(modifiedLocalStorageState).toEqual(expectedCorrectedState);
        expect(modifiedLocalStorageState.models.get(0).name).toEqual("Bob");
        expect(modifiedLocalStorageState.models.get(1).name).toEqual("Sally");
    }
    @Test propertyValueOnRecordInRecordExists(){
        var localStorageState = { model: { model: {name:"Bob"} } };
        var expectedCorrectedState = { model: new Models.LevelOneModel({model: new Models.LevelOneModel({name:"Bob"})}) };
        manipulateModel(localStorageState, Models.TestAppState);
        
        var modifiedLocalStorageState = <Models.TestAppState><any>localStorageState;
        expect(modifiedLocalStorageState).toEqual(expectedCorrectedState);
    }
    @Test modelMethodOnRecordInRecordExists() {
        var localStorageState = { model: { model: {name:"Bob"} } };
        var expectedCorrectedState = { model: new Models.LevelOneModel({model: new Models.LevelOneModel({name:"Bob"})}) };
        manipulateModel(localStorageState, Models.TestAppState);

        var modifiedLocalStorageState = <Models.TestAppState><any>localStorageState;
        expect(modifiedLocalStorageState.model.model.setName).toExist();
    }
    @Test modelMethodOnRecordInRecordReturnsCorrectValue() {
        var localStorageState = { model: { model: {name:"Bob"} } };
        var expectedCorrectedState = { model: new Models.LevelOneModel({model: new Models.LevelOneModel({name:"Bob"})}) };
        manipulateModel(localStorageState, Models.TestAppState);
        
        var modifiedLocalStorageState = <Models.TestAppState><any>localStorageState;
        expect(modifiedLocalStorageState.model.model.setName("Sally").name).toEqual("Sally");
    }
    @Test listOfModelsInModels() {
        var localStorageState = { models: [ { models: [
            { name: "Bob" }, { name: "Sally" }
        ] } ] };
        var expectedCorrectedState = { 
            models: List<Models.LevelOneModel>([ 
                new Models.LevelOneModel({
                    models: List<Models.LevelOneModel>([
                        new Models.LevelOneModel({name:"Bob"}), new Models.LevelOneModel({name:"Sally"})
                    ])
                })
            ])
        };
        manipulateModel(localStorageState, Models.TestAppState);

        var modifiedLocalStorageState = <Models.TestAppState><any>localStorageState;
        expect(modifiedLocalStorageState).toEqual(expectedCorrectedState);
        expect(modifiedLocalStorageState.models.get(0).models.get(0).name).toEqual("Bob");
        expect(modifiedLocalStorageState.models.get(0).models.get(1).name).toEqual("Sally");
    }
    @Test propertyValueOnRecordInRecordWithDifferentModelsExists(){
        var localStorageState = { user: { pet: { name: "Boy" } } };
        var expectedCorrectedState = { user: new Models.UserModel({pet: new Models.PetModel({name:"Boy"})}) };
        manipulateModel(localStorageState, Models.TestAppState);
        
        var modifiedLocalStorageState = <Models.TestAppState><any>localStorageState;
        expect(modifiedLocalStorageState).toEqual(expectedCorrectedState);
    }
    @Test modelMethodOnRecordInRecordWithDifferentModelsReturnsCorrectValue(){
        var localStorageState = { user: { pet: { name: "Boy" } } };
        var expectedCorrectedState = { user: new Models.UserModel({pet: new Models.PetModel({name:"Boy"})}) };
        manipulateModel(localStorageState, Models.TestAppState);
        
        var modifiedLocalStorageState = <Models.TestAppState><any>localStorageState;
        expect(modifiedLocalStorageState.user.pet.setName("Puppy").name).toEqual("Puppy");
    }
    @Test modifiedModelModifyingAPropertyReturningCorrectValue(){
        var localStorageState = { user:{name:"Bob"}};
        var expectedCorrectedState = { user:new Models.UserModel({name:"Bob"})};
        manipulateModel(localStorageState, Models.TestAppState);
        
        var modifiedLocalStorageState = <Models.TestAppState><any>localStorageState;
        
        var newUser = modifiedLocalStorageState.user.setName("Sally");
        
        expect(newUser.name).toEqual("Sally");
    }
    @Test creationOfStackWorks(){
        var localStorageState = { userStack:[{name:"Bob"}, {name:"Sally"}]};
        var expectedCorrectedState = { userStack:Stack<Models.UserModel>([new Models.UserModel({name:"Bob"}), new Models.UserModel({name:"Sally"})])};
        manipulateModel(localStorageState, Models.TestAppState);
        
        var modifiedLocalStorageState = <Models.TestAppState><any>localStorageState;
        expect(modifiedLocalStorageState).toEqual(expectedCorrectedState);
        
        expect(modifiedLocalStorageState.userStack.peek().name).toEqual("Bob");
        expect(modifiedLocalStorageState.userStack.pop().peek().name).toEqual("Sally");
    }
    @Test simulateWebApiResponse_transformSingleUser(){
        var json = `{"name":"Bob"}`;
        var userResponsePoco = JSON.parse(json);
        var expectedUserModel = new Models.UserModel({name:"Boy"});
        
        var modifiedUserPoco = createModelFromPoco<Models.UserModel>(Models.UserModel, userResponsePoco);
        
        expect(modifiedUserPoco).toEqual(expectedUserModel);
    }
    @Test simulateWebApiResponse_transformArrayOfUsers(){
        var json = `[{"name":"Bob"},{"name":"Sally"}]`;
        var userResponsePoco = JSON.parse(json);
        var expectedUserModel = List<Models.UserModel>([new Models.UserModel({name:"Boy"}),new Models.UserModel({name:"Sally"})]);
        
        var modifiedUserPoco = createModelsFromPoco<List<Models.UserModel>, Models.UserModel>(List, Models.UserModel, userResponsePoco);
        
        expect(modifiedUserPoco).toEqual(expectedUserModel);
    }
    @Test listOfPocos(){
        var localStorageState = { aliases: ["Good Boy", "Bad Boy"] };
        var expectedCorrectedState = new Models.PetModel({aliases: List<string>(["Good Boy", "Bad Boy"])});
        
        var modifiedLocalStorageState = createModelFromPoco<Models.PetModel>(Models.PetModel, localStorageState);
        expect(modifiedLocalStorageState).toEqual(expectedCorrectedState);
    }
}