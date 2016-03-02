import { Control } from 'angular2/common';

export class CustomValidators {
    
    static startsWithoutNumber(control: Control): ValidationResult {
        if (control.value !="" && !isNaN(control.value.charAt(0)) ){
            return { "startsWithoutNumber": true };
        }
        return null;
    }
    
    static startWithUpperCase(c: Control): ValidationResult {
        return !c.value.match(/^[A-Z]+[a-z][A-Z]*/) ? { "startWithUpperCase": true } : null;
    }
}