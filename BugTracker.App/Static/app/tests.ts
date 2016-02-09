import { TestRunnerBase } from "./tests.base";
import { UserStoreReducersTest } from "./features/users/userStoreReducers.tests";
import { IssueStoreReducersTest } from "./features/issues/issueStoreReducers.tests";

export class TestRunner extends TestRunnerBase{
    
    private isTestMethod(object:any, name:string):boolean{
        return name != "constructor" && typeof object[name] == "function";
    }
    
    public execute(){
        var testFixtures : Array<TestRunnerBase> = [
            new UserStoreReducersTest(),
            new IssueStoreReducersTest()
        ];
        
        var occurredErrors : Array<string> = testFixtures.map((testRunner: TestRunner) => {
            
            // cast to any to bypass the typechecking
            var testFixtureName : string = (<any>testRunner).constructor.toString().match(/\w+/g)[1];
            
            var testMethods:Array<string> = [];
            for (var property in testRunner){
                if (this.isTestMethod(testRunner, property)){
                    testMethods.push(property);
                }
            }
            
            var errors : Array<string> = testMethods.map(testMethod => {
                try {
                    // cast to any to bypass the typechecking
                    var method = <Function>(<any>testRunner)[testMethod];
                    method.call(testRunner);
                } catch (error) {
                    return `${testFixtureName} - ${testMethod}: ${error}`;
                }
            }).filter(error => error != null);
            
            return errors;
        }).reduce((accumulatedErrors, errors) => { return accumulatedErrors.concat(errors); });
        
        if (occurredErrors.length > 0){
            throw new Error(occurredErrors.join("\n"));
        }
    }
}