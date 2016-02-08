import { default as expect } from "expect";
import { default as deepFreeze } from "deep-freeze";

import { userStoreReducer } from "./stores/userStore";
import { Actions } from "./stores/userActions";

class Test{
    public run(){
        var beforeState:any = {
            users: []
        }
        var afterState:any = {
            users: [{name: "Bob"}]
        }
        var action:any = {
            type: Actions.ADD_USER,
            newUser: {name:"Bob"}
        }
        
        deepFreeze(beforeState);
        
        expect(userStoreReducer(beforeState, action)).toEqual(afterState);
    }
}

new Test().run();