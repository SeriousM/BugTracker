import { expect, deepFreeze, TestRunnerBase } from "../../tests.base";
import { IAction, AppState, UserModel } from "../../store/appStore.base";

import { userStoreReducer } from "./userStoreReducers";
import { UserStoreActionTypes, UserStoreActions, IAddUserAction, IRemoveUserAction } from "./userStoreActions";

export class UserStoreReducersTest extends TestRunnerBase{
    addNewUser_works(){
        var beforeState = <Array<UserModel>>[];
        var afterState = <Array<UserModel>>[];
        afterState.push(new UserModel("Bob"));
        
        var action = UserStoreActions.AddUser("Bob");
        
        deepFreeze(beforeState);
        deepFreeze(action);
        
        expect(userStoreReducer(beforeState, action)).toEqual(afterState);
    }
    removeUser_works(){
        var beforeState = <Array<UserModel>>[];
        beforeState.push(new UserModel("A"));
        beforeState.push(new UserModel("B"));
        beforeState.push(new UserModel("C"));
        var afterState = <Array<UserModel>>[];
        afterState.push(new UserModel("A"));
        afterState.push(new UserModel("C"));
        
        var action = UserStoreActions.RemoveUser(1 /* user "B" */);
        
        deepFreeze(beforeState);
        deepFreeze(action);
        
        expect(userStoreReducer(beforeState, action)).toEqual(afterState);
    }
    removeUnknownUser_works(){
        var beforeState = <Array<UserModel>>[];
        var afterState = <Array<UserModel>>[];
        
        var action = UserStoreActions.RemoveUser(1 /* unknown User */);
        
        deepFreeze(beforeState);
        deepFreeze(action);
        
        expect(userStoreReducer(beforeState, action)).toEqual(afterState);
    }
    public execute(){
        this.addNewUser_works();
        this.removeUser_works();
        this.removeUnknownUser_works();
    }
}