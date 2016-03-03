import * as Immutable from 'immutable';
import * as ModelMeta from '../../utils/model/meta';
import * as Models from '../models';
import * as ModelBase from '../models.base';

export interface IIssueModelUpdate {
    id?: string;
    userId?: string;
    title?: string;
    content?: string;
    reportDate?: Date;
    isClosed?: boolean;
}

interface IIssueModel {
    id: string;
    userId: string;
    title: string;
    content: string;
    reportDate: Date;
    isClosed: boolean;
    setId(id: string): IssueModel;
    setUserId(userId: string): IssueModel;
    setTitle(title: string): IssueModel;
    setContent(content: string): IssueModel;
    setReportDate(reportDate: Date): IssueModel;
    setIsClosed(isClosed: boolean): IssueModel;
}

const IssueModelRecord = Immutable.Record(<IIssueModel>{
    id: <string>null,
    userId: <string>null,
    title: <string>null,
    content: <string>null,
    reportDate: <Date>null,
    isClosed: <boolean>null
});

@ModelMeta.ImplementsClass(IssueModelRecord)
export class IssueModel implements IIssueModel, ModelMeta.IClassHasMetaImplements {
    private _record: Immutable.Map<string, any>;
    @ModelMeta.ImplementsPoco() public get id(): string {
        return this._record.get('id');
    }
    @ModelMeta.ImplementsPoco() public get userId(): string {
        return this._record.get('userId');
    }
    @ModelMeta.ImplementsPoco() public get title(): string {
        return this._record.get('title');
    }
    @ModelMeta.ImplementsPoco() public get content(): string {
        return this._record.get('content');
    }
    @ModelMeta.ImplementsPoco() public get reportDate(): Date {
        return this._record.get('reportDate');
    }
    @ModelMeta.ImplementsPoco() public get isClosed(): boolean {
        return this._record.get('isClosed');
    }
    public updateFromModel(updateObject: IIssueModelUpdate): IssueModel {
        var newRecord = this._record.withMutations(map => ModelBase.updateFromModel(map, updateObject));
        return new IssueModel(newRecord);
    }
    public setId(id: string): IssueModel {
        return new IssueModel(this._record.set('id', id));
    }
    public setUserId(userId: string): IssueModel {
        return new IssueModel(this._record.set('userId', userId));
    }
    public setTitle(title: string): IssueModel {
        return new IssueModel(this._record.set('title', title));
    }
    public setContent(content: string): IssueModel {
        return new IssueModel(this._record.set('content', content));
    }
    public setReportDate(reportDate: Date): IssueModel {
        return new IssueModel(this._record.set('reportDate', reportDate));
    }
    public setIsClosed(isClosed: boolean): IssueModel {
        return new IssueModel(this._record.set('isClosed', isClosed));
    }
    
    constructor(initialObject?: IIssueModelUpdate) {
        if (initialObject === null || initialObject === void 0) {
            initialObject = {};
        }
        else {
            if (initialObject instanceof IssueModelRecord) {
                ModelBase.extendModelWithRecord(this, initialObject);
                return;
            }
            if (!ModelBase.isPlainObject(initialObject)) {
                ModelBase.riseModelInitializationWithNonPlainObjectError('IssueModel');
            }
        }
        ModelBase.extendModelWithRecord(this, initialObject, IssueModelRecord);
    }

    /** Getter of the property. Setting this property will throw an error because the model is immutable. Use setId(...) instead. */
    public set id(value: string) { ModelBase.riseImmutableModelError('IssueModel', 'id', 'setId'); }
    /** Getter of the property. Setting this property will throw an error because the model is immutable. Use setUserId(...) instead. */
    public set userId(value: string) { ModelBase.riseImmutableModelError('IssueModel', 'userId', 'setUserId'); }
    /** Getter of the property. Setting this property will throw an error because the model is immutable. Use setTitle(...) instead. */
    public set title(value: string) { ModelBase.riseImmutableModelError('IssueModel', 'title', 'setTitle'); }
    /** Getter of the property. Setting this property will throw an error because the model is immutable. Use setContent(...) instead. */
    public set content(value: string) { ModelBase.riseImmutableModelError('IssueModel', 'content', 'setContent'); }
    /** Getter of the property. Setting this property will throw an error because the model is immutable. Use setReportDate(...) instead. */
    public set reportDate(value: Date) { ModelBase.riseImmutableModelError('IssueModel', 'reportDate', 'setReportDate'); }
    /** Getter of the property. Setting this property will throw an error because the model is immutable. Use setIsClosed(...) instead. */
    public set isClosed(value: boolean) { ModelBase.riseImmutableModelError('IssueModel', 'isClosed', 'setIsClosed'); }
    public toJSON() {
        return {
            id: this.id,
            userId: this.userId,
            title: this.title,
            content: this.content,
            reportDate: this.reportDate,
            isClosed: this.isClosed
        }
    }
}