export { default as expect } from "expect";
export { default as deepFreeze } from "deep-freeze";

export abstract class TestRunnerBase {
}
export class TestResult {
    public successful: boolean;
    constructor(
        public testFixture: string,
        public testMethod: string,
        public executionTimeMs: number,
        public errorMessage?: string) {
        if (executionTimeMs < 0){
            this.executionTimeMs = 0;
        }
        this.successful = errorMessage == null;
    }
}
export interface ITestResults {
    success: Array<TestResult>;
    failed: Array<TestResult>;
}