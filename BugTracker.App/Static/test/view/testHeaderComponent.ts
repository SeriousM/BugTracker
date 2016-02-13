import { Component, Input, ChangeDetectionStrategy } from "angular2/core";

import { ITestResults } from "../tests.base";

@Component({
    selector: "test-header",
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
        <h1 class="header">
            Result: <strong>{{testResults.success.length}} / {{totalTestCount}}</strong> tests passed.
            Total time: <strong>{{totalExecutionTimeMs}}ms.</strong>
        </h1>
    `
})

export class TestHeader {
    @Input() public testResults: ITestResults;
    private get totalTestCount() {
        return this.testResults.success.length + this.testResults.failed.length;
    }
    private get totalExecutionTimeMs() {
        return this.testResults.all.reduce(function(sum, testResult) { return sum += testResult.executionTimeMs }, 0);
    }
}