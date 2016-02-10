import { expect, deepFreeze, TestRunnerBase } from "../../tests.base";
import { IAction, AppState, UserModel } from "../../store/appStore.base";

import { currentUserStoreReducer } from "./currentUserStoreReducers";
import { CurrentUserStoreActionTypes, CurrentUserStoreActions, ISetCurrentUserAction } from "./currentUserStoreActions";

export class CurrentUserStoreReducersTest extends TestRunnerBase{
    initialSetCurrentUser_works(){
        var beforeState = <UserModel>null;
        var afterState = new UserModel("Bob");
        
        var action = CurrentUserStoreActions.SetCurrentUser(new UserModel("Bob"));
        
        deepFreeze(action);
        
        expect(currentUserStoreReducer(beforeState, action)).toEqual(afterState);
    }
    replaceCurrentUser_works(){
        var beforeState = new UserModel("Bob");
        var afterState = new UserModel("Sally");
        
        var action = CurrentUserStoreActions.SetCurrentUser(new UserModel("Sally"));
        
        deepFreeze(beforeState);
        deepFreeze(action);
        
        expect(currentUserStoreReducer(beforeState, action)).toEqual(afterState);
    }
    removeCurrentUser_works(){
        var beforeState = new UserModel("Bob");
        var afterState = <UserModel>null;
        
        var action = CurrentUserStoreActions.SetCurrentUser(null);
        
        deepFreeze(beforeState);
        deepFreeze(action);
        
        expect(currentUserStoreReducer(beforeState, action)).toEqual(afterState);
    }
}