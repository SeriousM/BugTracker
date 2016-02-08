// Compiled using typings@0.6.6
// Source: https://raw.githubusercontent.com/DefinitelyTyped/DefinitelyTyped/ba4e8607eb36ca1588ce316b20ed1053c08c496f/deep-freeze/deep-freeze.d.ts
// Type definitions for deep-freeze
// Project: https://github.com/substack/deep-freeze
// Definitions by: Bart van der Schoor <https://github.com/Bartvds>
// Definitions: https://github.com/borisyankov/DefinitelyTyped

declare module 'deep-freeze' {
	function df<T>(obj: T): T;
    export default df;
}