import { TestRunnerBase, TestResult, ITestResults } from "./tests.base";
import { IHasMetaTests } from "./meta";

export class TestRunner extends TestRunnerBase {

    constructor(private testFixtures: TestRunnerBase[]) {
        super();
    }

    private getFailedTestResults(testResult: TestResult) {
        return !testResult.successful;
    }
    private getSuccessTestResults(testResult: TestResult) {
        return testResult.successful;
    }

    public execute(fixtureFilter: string, methodFilter: string): ITestResults {
        var allTestResults: TestResult[] = this.testFixtures.map((testRunner: TestRunner) => {

            var testFixtureName: string = testRunner.constructor.toString().match(/\w+/g)[1];

            if (fixtureFilter != null && testFixtureName != fixtureFilter) {
                return [];
            }

            var testMethods: string[] = testRunner.constructor.prototype.__metaTests.tests;

            var testResults: TestResult[] = testMethods.map(testMethod => {
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