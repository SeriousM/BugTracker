import * as Immutable from 'immutable';
import * as ModelMeta from '../utils/model/meta';
import * as Models from './models';
import * as ModelBase from './models.base';

export interface ISessionStateModelUpdate {
    hasIssuesLoaded? : boolean;
}

interface ISessionStateModel {
    hasIssuesLoaded : boolean;
    setHasIssuesLoaded(value: boolean): SessionStateModel;   
}

const SessionStateModelRecord = Immutable.Record(<ISessionStateModel>{
    hasIssuesLoaded: <boolean>false,
});

@ModelMeta.ImplementsClass(SessionStateModelRecord)
export class SessionStateModel implements ISessionStateModel, ModelMeta.IClassHasMetaImplements {
    private _record: Immutable.Map<string, any>;
    @ModelMeta.ImplementsPoco() public get hasIssuesLoaded(): boolean {
        return this._record.get('hasIssuesLoaded');
    }
    
    public setHasIssuesLoaded(value: boolean): SessionStateModel {
        return new SessionStateModel(this._record.set('hasIssuesLoaded', value));
    }
        
    constructor(initialObject?: ISessionStateModelUpdate) {
        if (initialObject === null || initialObject === void 0) {
            initialObject = {};
        }
        else {
            if (initialObject instanceof SessionStateModelRecord) {
                ModelBase.extendModelWithRecord(this, initialObject);
                return;
            }
            if (!ModelBase.isPlainObject(initialObject)) {
                ModelBase.riseModelInitializationWithNonPlainObjectError('IssueModel');
            }
        }
        ModelBase.extendModelWithRecord(this, initialObject, SessionStateModelRecord);
    }

    /** Getter of the property. Setting this property will throw an error because the model is immutable. Use setHasIssuesLoaded(...) instead. */
    public set hasIssuesLoaded(value: boolean) { ModelBase.riseImmutableModelError('SessionStateModel', 'hasIssuesLoaded', 'setHasIssuesLoaded'); }
}