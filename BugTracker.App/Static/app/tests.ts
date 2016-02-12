import { TestRunnerBase, TestResult, ITestResults } from "./tests.base";
import { UserStoreReducersTest } from "./features/users/store/userStoreReducers.tests";
import { IssueStoreReducersTest } from "./features/issues/store/issueStoreReducers.tests";
import { CurrentUserStoreReducersTest } from "./features/currentUser/store/currentUserStoreReducers.tests";

export class TestRunner extends TestRunnerBase {

    private isTestMethod(object: any, name: string): boolean {
        return name != "constructor" && typeof object[name] == "function";
    }

    private getFailedTestResults(testResult: TestResult) {
        return !testResult.successful;
    }
    private getSuccessTestResults(testResult: TestResult) {
        return testResult.successful;
    }

    private getTestFixtures(): Array<TestRunnerBase> {
        return <Array<TestRunnerBase>>[
            new UserStoreReducersTest(),
            new IssueStoreReducersTest(),
            new CurrentUserStoreReducersTest()
        ];
    }

    public execute(fixtureFilter: string, methodFilter: string): ITestResults {
        var testFixtures = this.getTestFixtures();

        var allTestResults: Array<TestResult> = testFixtures.map((testRunner: TestRunner) => {

            var testFixtureName: string = testRunner.constructor.toString().match(/\w+/g)[1];

            if (fixtureFilter != null && testFixtureName != fixtureFilter) {
                return [];
            }

            var testMethods: Array<string> = [];
            for (var property in testRunner) {
                if (!this.isTestMethod(testRunner, property)) {
                    continue;
                }
                if (methodFilter == null || property == methodFilter) {
                    testMethods.push(property);
                }
            }

            var testResults: Array<TestResult> = testMethods.map(testMethod => {
                // cast to any to bypass the typechecking
                var method = <Function>(<any>testRunner)[testMethod];

                var occurredError:any = null;
                var start = new Date().getMilliseconds();
                try {
                    method.call(testRunner);
                } catch (error) {
                    occurredError = error;
                }
                var end = new Date().getMilliseconds();
                var executionTimeMs = end - start;
                var testResult:TestResult;

                if (occurredError == null){
                    testResult = new TestResult(testFixtureName, testMethod, executionTimeMs);
                }
                else{
                    testResult = new TestResult(testFixtureName, testMethod, executionTimeMs, occurredError);
                }
                
                return testResult;
            });

            return testResults;
        }).reduce((accumulatedTestResults, currentTestResults) => { return accumulatedTestResults.concat(currentTestResults); });

        var testResults = { success: allTestResults.filter(this.getSuccessTestResults), failed: allTestResults.filter(this.getFailedTestResults) };

        return testResults;
    }
}