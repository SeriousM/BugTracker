import { TestRunnerBase } from "./tests.base";

import { UserStoreReducersTests } from "../app/features/users/store/userStoreReducers.tests";
import { IssueStoreReducersTests } from "../app/features/issues/store/issueStoreReducers.tests";
import { CurrentUserStoreReducersTests } from "../app/features/currentUser/store/currentUserStoreReducers.tests";

export const getTestFixtures = (): Array<TestRunnerBase> => {
    return <Array<TestRunnerBase>>[
        new UserStoreReducersTests(),
        new IssueStoreReducersTests(),
        new CurrentUserStoreReducersTests(),
    ];
}