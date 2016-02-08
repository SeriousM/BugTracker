import { default as expect } from "expect";
import { default as deepFreeze } from "deep-freeze";

import { userStoreReducer } from "./stores/userStore";

class Test{
    public run(){
        var beforeState:any = {
            a: 1
        }
        var afterState:any = {
            a: 2
        }
        var action:any = {
            type: "INCREMENT",
            a: 2
        }
        
        deepFreeze(beforeState);
        
        expect(userStoreReducer(beforeState, action)).toEqual(afterState);
    }
}

new Test().run();