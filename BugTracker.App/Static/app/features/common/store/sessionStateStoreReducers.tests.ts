import { List } from 'immutable';

import { expect, deepFreeze, TestRunnerBase, TestFixture, Test } from "../../../../test/tests.base";
import { IAction } from "../../../store/appStore.base";
import { AppState, SessionStateModel } from "../../../models/models";

import { sessionStateStoreReducer } from "./sessionStateStoreReducers";
import { SessionStateActionTypes, SessionStateActions } from "./sessionStateStoreActions";

@TestFixture
export class SessionStateStoreReducersTests extends TestRunnerBase {
    @Test changeIssuesLoadedState_works() {
        var beforeState = new SessionStateModel();
        var afterState = new SessionStateModel().setHasIssuesLoaded(true);       
         
        var action = SessionStateActions.ChangeIssueLoadedState(true);

        deepFreeze(beforeState);
        deepFreeze(action);

        expect(sessionStateStoreReducer(beforeState, action)).toEqual(afterState);
    }
}