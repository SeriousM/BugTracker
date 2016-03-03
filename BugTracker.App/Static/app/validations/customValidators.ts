import { Control } from 'angular2/common';
import { IValidationResult, getValidationResult  } from './validationResult';

export class CustomValidators {
    
    static startsWithoutNumber(control: Control): IValidationResult {
        
        var validationResult = getValidationResult("startsWithoutNumber");
        
        if (control.value == null)
        {
            return validationResult;
        }
        if (!control.value.match(/^\d+/))
        {
            return validationResult;
        }
        return null;
    }
    
    static startWithUpperCase(control: Control): IValidationResult {
        
        var validationResult = getValidationResult("startWithUpperCase");
        
        if (control.value == null)
        {
            return validationResult;
        }
        if (!control.value.match(/^[A-Z]+[a-z][A-Z]*/))
        {
            return validationResult;
        }
        return null;
    }
}