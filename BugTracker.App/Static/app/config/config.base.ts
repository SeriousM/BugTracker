export class AppConfiguration {
    public baseApiUrl: string;
    
    constructor(rawConfiguration: any) {  
        
        // TODO: Check if all config options are valid
        this.baseApiUrl = rawConfiguration.apiBaseUrl;
    }
}