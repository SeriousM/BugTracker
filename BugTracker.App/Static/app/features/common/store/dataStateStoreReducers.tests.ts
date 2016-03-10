import { List } from 'immutable';

import { expect, deepFreeze, TestRunnerBase, TestFixture, Test } from "../../../../test/tests.base";
import { IAction } from "../../../store/appStore.base";
import { AppState, DataStateModel } from "../../../models/models";

import { dataStateStoreReducer } from "./dataStateStoreReducers";
import { DataStateActionTypes, DataStateActions } from "./dataStateStoreActions";

@TestFixture
export class DataStateStoreReducersTests extends TestRunnerBase {
    @Test changeIssuesLoadedState_works() {
        var beforeState = new DataStateModel();
        var afterState = new DataStateModel().setAreIssuesLoaded(true);

        var action = DataStateActions.ChangeIssueLoadedState(true);

        deepFreeze(beforeState);
        deepFreeze(action);

        expect(dataStateStoreReducer(beforeState, action)).toEqual(afterState);
    }
}