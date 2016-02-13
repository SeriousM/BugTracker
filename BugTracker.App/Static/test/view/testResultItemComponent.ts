import { Component, Input, ChangeDetectionStrategy } from "angular2/core";
import { TestResult } from "../tests.base";

@Component({
    selector: "test-result-item",
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
        <div>
            <p [class.success]="testResult.successful" [class.error]="!testResult.successful">
                <strong *ngIf="!testResult.successful">✖</strong>
                <strong *ngIf="testResult.successful">✔</strong>
                <a href="?fixture={{fixture}}">{{fixture}}</a> - <a href="?fixture={{fixture}}&method={{method}}">{{method}}</a>
                <small>({{testResult.executionTimeMs}}ms)</small>
                <br>
                <small class="errorMessage"><i>{{testResult.errorMessage}}</i></small>
            </p>
        </div>
    `
})

export class TestResultItem {
    @Input() public testResult: TestResult;
    private get fixture() {
        return this.testResult.testFixture;
    }
    private get method() {
        return this.testResult.testMethod;
    }
}