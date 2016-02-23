import { List } from 'immutable';

import { expect, deepFreeze, TestRunnerBase, TestFixture, Test } from "../../../../test/tests.base";
import { IAction } from "../../../store/appStore.base";
import { AppState, IssueModel } from "../../../models/models";

import { issueStoreReducer } from "./issueStoreReducers";
import { IssueStoreActionTypes, IssueStoreActions, IAddIssueAction } from "./issueStoreActions";

@TestFixture
export class IssueStoreReducersTests extends TestRunnerBase {
    @Test addNewIssue_works() {
        var beforeState = List<IssueModel>();
        var afterState = List<IssueModel>()
            .push(new IssueModel({ title: "A Problem" }));

        var action = IssueStoreActions.AddIssue("A Problem");

        deepFreeze(beforeState);
        deepFreeze(action);

        expect(issueStoreReducer(beforeState, action)).toEqual(afterState);
    }
}