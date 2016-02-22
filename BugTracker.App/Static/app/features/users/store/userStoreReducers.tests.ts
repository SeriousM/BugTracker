import { List } from 'immutable';

import { expect, deepFreeze, TestRunnerBase, TestFixture, Test } from "../../../../test/tests.base";
import { IAction } from "../../../store/appStore.base";
import { AppState, UserModel } from "../../../models/models";

import { userStoreReducer } from "./userStoreReducers";
import { UserStoreActionTypes, UserStoreActions, IAddUserAction, IRemoveUserAction } from "./userStoreActions";

@TestFixture
export class UserStoreReducersTests extends TestRunnerBase {
    @Test addNewUser_works() {
        var beforeState = List<UserModel>();
        var afterState = List<UserModel>()
            .push(new UserModel().setName("Bob"));

        var action = UserStoreActions.AddUser("Bob");

        deepFreeze(beforeState);
        deepFreeze(action);

        expect(userStoreReducer(beforeState, action)).toEqual(afterState);
    }
    @Test removeUser_works() {
        var beforeState = List<UserModel>()
            .push(new UserModel().setName("A"))
            .push(new UserModel().setName("B"))
            .push(new UserModel().setName("C"));
        var afterState = List<UserModel>()
            .push(new UserModel().setName("A"))
            .push(new UserModel().setName("C"));

        var action = UserStoreActions.RemoveUser(1 /* user "B" */);

        deepFreeze(beforeState);
        deepFreeze(action);

        expect(userStoreReducer(beforeState, action)).toEqual(afterState);
    }
    @Test removeUnknownUser_works() {
        var beforeState = List<UserModel>();
        var afterState = List<UserModel>();

        var action = UserStoreActions.RemoveUser(1 /* unknown User */);

        deepFreeze(beforeState);
        deepFreeze(action);

        expect(userStoreReducer(beforeState, action)).toEqual(afterState);
    }
}