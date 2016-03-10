import { TestRunnerBase } from "./tests.base";

import { DataStateStoreReducersTests } from "../app/features/common/store/dataStateStoreReducers.tests";
import { UserStoreReducersTests } from "../app/features/users/store/userStoreReducers.tests";
import { IssueStoreReducersTests } from "../app/features/issues/store/issueStoreReducers.tests";
import { CurrentUserStoreReducersTests } from "../app/features/currentUser/store/currentUserStoreReducers.tests";
import { ModelParserTests } from "../app/utils/model/parser.tests";

export function getTestFixtures(): TestRunnerBase[] {
    return <TestRunnerBase[]>[
        new UserStoreReducersTests(),
        new IssueStoreReducersTests(),
        new CurrentUserStoreReducersTests(),
        new ModelParserTests(),
        new DataStateStoreReducersTests()
    ];
}