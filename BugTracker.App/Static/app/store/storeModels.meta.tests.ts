import { List, Record } from 'immutable';

import { expect, deepFreeze, TestRunnerBase } from "../../test/tests.base";

import { Implements, ImplementsList } from "./storeModels.meta";

interface ILevelOneModel {
    name: string
    // levelOneModel: LevelOneModel;
    // levelOneModels: List<LevelOneModel>;
}
const LevelOneModelRecord = Record(<ILevelOneModel>{
    name: <string>null
    // ,levelOneModel: <LevelOneModel>null
    // ,levelOneModels: <List<LevelOneModel>>null
});
@Implements(LevelOneModelRecord)
class LevelOneModel extends LevelOneModelRecord {
    public name: string;
    // @Implements(LevelOneModel) public levelOneModel: LevelOneModel;
    // @ImplementsList(LevelOneModel) public levelOneModels: List<LevelOneModel>;

    public getName() {
        return name;
    }

    constructor(name: string) {
        super({ name });
    }
}

class TestAppState {
    @Implements(LevelOneModel) public levelOneModel: LevelOneModel;
    // @ImplementsList(LevelOneModel) public levelOneModels: List<LevelOneModel>;
}

export class StoreModelsMetaTests extends TestRunnerBase {

}