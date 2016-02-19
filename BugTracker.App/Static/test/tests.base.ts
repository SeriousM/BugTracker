export { default as expect } from "expect";
export { default as deepFreeze } from "deep-freeze";

import { IHasMetaTests, TestFixture, Test } from "./meta";

export { TestFixture, Test };

export abstract class TestRunnerBase implements IHasMetaTests {
}
export class TestResult {
    public successful: boolean;
    constructor(
        public testFixture: string,
        public testMethod: string,
        public executionTimeMs: number,
        public errorMessage?: string) {
        if (executionTimeMs < 0) {
            this.executionTimeMs = 0;
        }
        this.successful = errorMessage == null;
    }
}
export interface ITestResults {
    all: TestResult[];
    success: TestResult[];
    failed: TestResult[];
}