import { expect, deepFreeze, TestRunnerBase } from "../../tests.base";

import { userStoreReducer } from "./userStoreReducers";
import { UserStoreActions } from "./userStoreActions";

export class UserStoreReducersTest extends TestRunnerBase{
    addNewUser_works(){
        var beforeState:any = {
            users: []
        }
        var afterState:any = {
            users: [{name: "Bob"}]
        }
        var action:any = {
            type: UserStoreActions.ADD_USER,
            newUser: {name:"Bob"}
        }
        
        deepFreeze(beforeState);
        deepFreeze(action);
        
        expect(userStoreReducer(beforeState, action)).toEqual(afterState);
    }
    removeUser_works(){
        var beforeState:any = {
            users: [{name:"A"},{name:"B"},{name:"C"}]
        }
        var afterState:any = {
            users: [{name:"A"},{name:"C"}]
        }
        var action:any = {
            type: UserStoreActions.REMOVE_USER,
            userToRemoveIndex: 1 // user "B"
        }
        
        deepFreeze(beforeState);
        deepFreeze(action);
        
        expect(userStoreReducer(beforeState, action)).toEqual(afterState);
    }
    removeUnknownUser_works(){
        var beforeState:any = {
            users: []
        }
        var afterState:any = {
            users: []
        }
        var action:any = {
            type: UserStoreActions.REMOVE_USER,
            userToRemoveIndex: 1 // unknown User
        }
        
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