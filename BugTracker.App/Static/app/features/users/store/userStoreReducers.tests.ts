import { List } from 'immutable';

import { expect, deepFreeze, TestRunnerBase } from "../../../../test/tests.base";
import { IAction, AppState } from "../../../store/appStore.base";
import { UserModel } from "../../../store/storeModels";

import { userStoreReducer } from "./userStoreReducers";
import { UserStoreActionTypes, UserStoreActions, IAddUserAction, IRemoveUserAction } from "./userStoreActions";

export class UserStoreReducersTest extends TestRunnerBase {
    addNewUser_works() {
        var beforeState = List<UserModel>();
        var afterState = List<UserModel>()
            .push(new UserModel("Bob"));

        var action = UserStoreActions.AddUser("Bob");

        deepFreeze(beforeState);
        deepFreeze(action);

        expect(userStoreReducer(beforeState, action)).toEqual(afterState);
    }
    removeUser_works() {
        var beforeState = List<UserModel>()
            .push(new UserModel("A"))
            .push(new UserModel("B"))
            .push(new UserModel("C"));
        var afterState = List<UserModel>()
            .push(new UserModel("A"))
            .push(new UserModel("C"));

        var action = UserStoreActions.RemoveUser(1 /* user "B" */);

        deepFreeze(beforeState);
        deepFreeze(action);

        expect(userStoreReducer(beforeState, action)).toEqual(afterState);
    }
    removeUnknownUser_works() {
        var beforeState = List<UserModel>();
        var afterState = List<UserModel>();

        var action = UserStoreActions.RemoveUser(1 /* unknown User */);

        deepFreeze(beforeState);
        deepFreeze(action);

        expect(userStoreReducer(beforeState, action)).toEqual(afterState);
    }
}