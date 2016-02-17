import { List } from 'immutable';

import { expect, deepFreeze, TestRunnerBase } from "../../../../test/tests.base";
import { IAction, AppState } from "../../../store/appStore.base";
import { IssueModel } from "../../../store/storeModels";

import { issueStoreReducer } from "./issueStoreReducers";
import { IssueStoreActionTypes, IssueStoreActions, IAddIssueAction } from "./issueStoreActions";

export class IssueStoreReducersTests extends TestRunnerBase {
    addNewIssue_works() {
        var beforeState = List<IssueModel>();
        var afterState = List<IssueModel>()
            .push(new IssueModel("A Problem"));

        var action = IssueStoreActions.AddIssue("A Problem");

        deepFreeze(beforeState);
        deepFreeze(action);

        expect(issueStoreReducer(beforeState, action)).toEqual(afterState);
    }
}