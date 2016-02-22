import { expect, deepFreeze, TestRunnerBase, TestFixture, Test } from "../../../../test/tests.base";
import { IAction } from "../../../store/appStore.base";
import { AppState, UserModel, CurrentUserState } from "../../../models/models";

import { currentUserStoreReducer } from "./currentUserStoreReducers";
import { CurrentUserStoreActionTypes, CurrentUserStoreActions, ISetCurrentUserAction } from "./currentUserStoreActions";

@TestFixture
export class CurrentUserStoreReducersTests extends TestRunnerBase {
    @Test initialSetCurrentUser_works() {
        var beforeState = new CurrentUserState();
        var afterState = new CurrentUserState().setUser(new UserModel().setName("Bob"));

        var action = CurrentUserStoreActions.SetCurrentUser(new UserModel().setName("Bob"));

        deepFreeze(action);

        expect(currentUserStoreReducer(beforeState, action)).toEqual(afterState);
    }
    @Test replaceCurrentUser_works() {
        var beforeState = new CurrentUserState().setUser(new UserModel().setName("Bob"));
        var afterState = new CurrentUserState().setUser(new UserModel().setName("Sally"));

        var action = CurrentUserStoreActions.SetCurrentUser(new UserModel().setName("Sally"));

        deepFreeze(beforeState);
        deepFreeze(action);

        expect(currentUserStoreReducer(beforeState, action)).toEqual(afterState);
    }
    @Test removeCurrentUser_works() {
        var beforeState = new CurrentUserState().setUser(new UserModel().setName("Bob"));
        var afterState = new CurrentUserState();

        var action = CurrentUserStoreActions.RemoveCurrentUser();

        deepFreeze(beforeState);
        deepFreeze(action);

        expect(currentUserStoreReducer(beforeState, action)).toEqual(afterState);
    }
    @Test simulateReduxDevToolsStickySessionStateInit_nameIsSet() {
        var beforeState = new CurrentUserState();

        // simulate the redux-devtools state set after page reload and sticky session
        var action = CurrentUserStoreActions.SetCurrentUser(<UserModel>{name:"Bob"});

        deepFreeze(action);

        expect(currentUserStoreReducer(beforeState, action).user.name).toEqual("Bob");
    }
}