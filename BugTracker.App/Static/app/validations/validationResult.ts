export interface IValidationResult {
    [key: string]: boolean;
}

export function getValidationResult(validationKey: string): IValidationResult {
    var jsonString = "{\"" + validationKey + "\": \"true\" }";
    return <IValidationResult>JSON.parse(jsonString);
}