import { Component, Input } from "angular2/core";
import { bootstrap } from "angular2/platform/browser";

import { TestRunnerBase, ITestResults, TestResult } from "./tests.base";
import { TestRunner } from "./testRunner";

import { TestHeader } from "./view/testHeaderComponent";
import { TestResultItem } from "./view/testResultItemComponent";

import { getTestFixtures } from './testFixture.collection';

@Component({
    selector: "bug-tracker-tests",
    directives: [TestHeader, TestResultItem],
    template: `
        <div class="testResults">
            <test-header [testResults]="testResults"></test-header>
            <a *ngIf="isFilteredView" href="?">&lt;&lt; Show all tests</a>
            <div *ngIf="testResults.failed.length > 0">
                <sub class="errorInfo">Check the console output for more information</sub>
            </div>
            <test-result-item *ngFor="#testResult of testResults.failed" [testResult]="testResult"></test-result-item>
            <test-result-item *ngFor="#testResult of testResults.success" [testResult]="testResult"></test-result-item>
        </div>
    `
})
export class TestApp {
    private testResults: ITestResults;
    private isFilteredView: boolean;

    constructor() {
        this.executeTests();
    }
    private executeTests() {
        var testFixtures = getTestFixtures();
        var testRunner = new TestRunner(testFixtures);

        var fixtureFilter = this.getParameterByName("fixture");
        var methodFilter = this.getParameterByName("method");
        
        this.isFilteredView = fixtureFilter != null || methodFilter != null;

        this.testResults = testRunner.execute(fixtureFilter, methodFilter);
        
        this.updateDocumentTitle();
    }
    private getTitleStatus(){
        if (this.testResults.failed.length == 0){
            return "✔✔";
        }
        if (this.testResults.success.length != 0 && this.testResults.failed.length != 0){
            return "✔✖";
        }
        return "✖✖";
    }
    private updateDocumentTitle(){
        document.title = this.getTitleStatus() + " - " + document.title;
    }
    private getParameterByName(name: string, url?: string) {
        if (!url) {
            url = window.location.href
        };

        name = name.replace(/[\[\]]/g, "\\$&");
        var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)");

        var results = regex.exec(url);

        if (!results || !results[2]) {
            return null;
        }

        return decodeURIComponent(results[2].replace(/\+/g, " "));
    }
}

bootstrap(TestApp);