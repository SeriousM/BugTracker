///<reference path='../../typings/deep-freeze/deep-freeze.d.ts'/>
import { default as expect } from "expect";

import { userStoreReducer } from "./stores/userStore";

// well, the import works even it complains... 
// Has to be the last import because following imports wont get rendered (whatever the reason is).
import { default as deepFreeze } from "deep-freeze";

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