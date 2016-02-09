import { TestRunnerBase } from "./tests.base";
import { UserStoreReducersTest } from "./features/users/userStoreReducers.tests";

export class TestRunner extends TestRunnerBase{
    public execute(){
        new UserStoreReducersTest().execute();
    }
}