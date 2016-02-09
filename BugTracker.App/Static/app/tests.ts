import { TestRunnerBase } from "./tests.base";
import { UserStoreReducersTest } from "./features/users/userStoreReducers.tests";
import { IssueStoreReducersTest } from "./features/issues/issueStoreReducers.tests";

export class TestRunner extends TestRunnerBase{
    public execute(){
        new UserStoreReducersTest().execute();
        new IssueStoreReducersTest().execute();
    }
}