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

    public execute(): ITestResults {
        var testFixtures = this.getTestFixtures();

        var allTestResults: Array<TestResult> = testFixtures.map((testRunner: TestRunner) => {

            var testFixtureName: string = testRunner.constructor.toString().match(/\w+/g)[1];

            var testMethods: Array<string> = [];
            for (var property in testRunner) {
                if (this.isTestMethod(testRunner, property)) {
                    testMethods.push(property);
                }
            }

            var testResults: Array<TestResult> = testMethods.map(testMethod => {
                try {
                    // cast to any to bypass the typechecking
                    var method = <Function>(<any>testRunner)[testMethod];
                    method.call(testRunner);

                    return new TestResult(testFixtureName, testMethod);
                } catch (error) {
                    return new TestResult(testFixtureName, testMethod, error);
                }
            });

            return testResults;
        }).reduce((accumulatedTestResults, currentTestResults) => { return accumulatedTestResults.concat(currentTestResults); });

        var testResults = { success: allTestResults.filter(this.getSuccessTestResults), failed: allTestResults.filter(this.getFailedTestResults) };

        return testResults;
    }
}