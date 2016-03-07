import { List } from 'immutable';

import { expect, deepFreeze, TestRunnerBase, TestFixture, Test } from "../../../../test/tests.base";
import { IAction } from "../../../store/appStore.base";
import { AppState, DataStateModel } from "../../../models/models";

import { dataStateStoreReducer } from "./sessionStateStoreReducers";
import { DataStateActionTypes, SessionStateActions } from "./sessionStateStoreActions";

@TestFixture
export class SessionStateStoreReducersTests extends TestRunnerBase {
    @Test changeIssuesLoadedState_works() {
        var beforeState = new DataStateModel();
        var afterState = new DataStateModel().setAreIssuesLoaded(true);

        var action = SessionStateActions.ChangeIssueLoadedState(true);

        deepFreeze(beforeState);
        deepFreeze(action);

        expect(dataStateStoreReducer(beforeState, action)).toEqual(afterState);
    }
}