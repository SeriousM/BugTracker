import { expect, deepFreeze, TestRunnerBase } from "../../tests.base";
import { IAction, AppState, IssueModel } from "../../store/appStore.base";

import { issueStoreReducer } from "./issueStoreReducers";
import { IssueStoreActionTypes, IssueStoreActions, IAddIssueAction } from "./issueStoreActions";

export class IssueStoreReducersTest extends TestRunnerBase{
    addNewIssue_works(){
        var beforeState = <Array<IssueModel>>[];
        var afterState = <Array<IssueModel>>[];
        afterState.push(new IssueModel("A Problem"));
        
        var action = IssueStoreActions.AddIssue("A Problem");
        
        deepFreeze(beforeState);
        deepFreeze(action);
        
        expect(issueStoreReducer(beforeState, action)).toEqual(afterState);
    }
}