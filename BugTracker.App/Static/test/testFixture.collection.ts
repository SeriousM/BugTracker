import { TestRunnerBase } from "./tests.base";

import { UserStoreReducersTest } from "../app/features/users/store/userStoreReducers.tests";
import { IssueStoreReducersTest } from "../app/features/issues/store/issueStoreReducers.tests";
import { CurrentUserStoreReducersTest } from "../app/features/currentUser/store/currentUserStoreReducers.tests";

export const getTestFixtures = (): Array<TestRunnerBase> => {
    return <Array<TestRunnerBase>>[
        new UserStoreReducersTest(),
        new IssueStoreReducersTest(),
        new CurrentUserStoreReducersTest()
    ];
}