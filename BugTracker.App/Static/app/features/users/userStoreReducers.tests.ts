import { expect, deepFreeze, TestRunnerBase } from "../../tests.base";
import { IAction, AppState, UserModel } from "../../store/appStore.base";

import { userStoreReducer } from "./userStoreReducers";
import { UserStoreActionTypes, UserStoreActions, IAddUserAction, IRemoveUserAction } from "./userStoreActions";

export class UserStoreReducersTest extends TestRunnerBase{
    addNewUser_works(){
        var beforeState:AppState = new AppState();
        var afterState:AppState = new AppState();
        afterState.users.push(new UserModel("Bob"));
        
        var action = UserStoreActions.AddUser("Bob");
        
        deepFreeze(beforeState);
        deepFreeze(action);
        
        expect(userStoreReducer(beforeState, action)).toEqual(afterState);
    }
    removeUser_works(){
        var beforeState:AppState = new AppState();
        beforeState.users.push(new UserModel("A"));
        beforeState.users.push(new UserModel("B"));
        beforeState.users.push(new UserModel("C"));
        var afterState:AppState = new AppState();
        afterState.users.push(new UserModel("A"));
        afterState.users.push(new UserModel("C"));
        
        var action = UserStoreActions.RemoveUser(1 /* user "B" */);
        
        deepFreeze(beforeState);
        deepFreeze(action);
        
        expect(userStoreReducer(beforeState, action)).toEqual(afterState);
    }
    removeUnknownUser_works(){
        var beforeState:AppState = new AppState();
        var afterState:AppState = new AppState();
        
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