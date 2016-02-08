import { TestRunnerBase } from "./tests.base";
import { UserStoreReducersTest } from "./stores/userStoreReducers.tests";

export class TestRunner extends TestRunnerBase{
    public execute(){
        new UserStoreReducersTest().execute();
    }
}