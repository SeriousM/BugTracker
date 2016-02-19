import { TestRunnerBase, TestResult, ITestResults } from "./tests.base";

export class TestRunner extends TestRunnerBase {

    constructor(private testFixtures: Array<TestRunnerBase>) {
        super();
    }

    private isTestMethod(object: any, name: string): boolean {
        return name != "constructor" && typeof object[name] == "function";
    }

    private getFailedTestResults(testResult: TestResult) {
        return !testResult.successful;
    }
    private getSuccessTestResults(testResult: TestResult) {
        return testResult.successful;
    }


    public execute(fixtureFilter: string, methodFilter: string): ITestResults {
        var allTestResults: Array<TestResult> = this.testFixtures.map((testRunner: TestRunner) => {

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

                var occurredError: any = null;
                var start: any = new Date();
                try {
                    method.call(testRunner);
                } catch (error) {
                    occurredError = error;
                }
                var end: any = new Date();
                var executionTimeMs = end - start;
                var testResult: TestResult;

                if (occurredError == null) {
                    testResult = new TestResult(testFixtureName, testMethod, executionTimeMs);
                }
                else {
                    testResult = new TestResult(testFixtureName, testMethod, executionTimeMs, occurredError);

                    if (occurredError.actual || occurredError.expected) {
                        console.error(occurredError, { actual: occurredError.actual }, { expected: occurredError.expected });
                    }
                    else {
                        console.error(occurredError);
                    }
                }

                return testResult;
            });

            return testResults;
        }).reduce((accumulatedTestResults, currentTestResults) => { return accumulatedTestResults.concat(currentTestResults); });

        var testResults: ITestResults = {
            all: allTestResults,
            success: allTestResults.filter(this.getSuccessTestResults),
            failed: allTestResults.filter(this.getFailedTestResults)
        };

        return testResults;
    }
}