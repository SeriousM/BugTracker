import * as Immutable from 'immutable';
import * as ModelMeta from '../../utils/model/meta';
import * as Models from '../models';
import * as ModelBase from '../models.base';

export interface IDataStateModelUpdate {
    areIssuesLoaded?: boolean;
}

interface IDataStateModel {
    areIssuesLoaded: boolean;
    setAreIssuesLoaded(value: boolean): DataStateModel;
}

const SessionStateModelRecord = Immutable.Record(<IDataStateModel>{
    areIssuesLoaded: <boolean>false,
});

@ModelMeta.ImplementsClass(SessionStateModelRecord)
export class DataStateModel implements IDataStateModel, ModelMeta.IClassHasMetaImplements {
    private _record: Immutable.Map<string, any>;
    @ModelMeta.ImplementsPoco() public get areIssuesLoaded(): boolean {
        return this._record.get('areIssuesLoaded');
    }

    public setAreIssuesLoaded(value: boolean): DataStateModel {
        return new DataStateModel(this._record.set('areIssuesLoaded', value));
    }

    constructor(initialObject?: IDataStateModelUpdate) {
        if (initialObject === null || initialObject === void 0) {
            initialObject = {};
        }
        else {
            if (initialObject instanceof SessionStateModelRecord) {
                ModelBase.extendModelWithRecord(this, initialObject);
                return;
            }
            if (!ModelBase.isPlainObject(initialObject)) {
                ModelBase.riseModelInitializationWithNonPlainObjectError('DataStateModel');
            }
        }
        ModelBase.extendModelWithRecord(this, initialObject, SessionStateModelRecord);
    }

    /** Getter of the property. Setting this property will throw an error because the model is immutable. Use setAreIssuesLoaded(...) instead. */
    public set areIssuesLoaded(value: boolean) { ModelBase.riseImmutableModelError('DataStateModel', 'areIssuesLoaded', 'setAreIssuesLoaded'); }
}