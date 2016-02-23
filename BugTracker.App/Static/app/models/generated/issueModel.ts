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
export class IssueModel extends IssueModelRecord implements IIssueModel, ModelMeta.IClassHasMetaImplements {
    @ModelMeta.ImplementsPoco() public id: string;
    @ModelMeta.ImplementsPoco() public userId: string;
    @ModelMeta.ImplementsPoco() public title: string;
    @ModelMeta.ImplementsPoco() public content: string;
    @ModelMeta.ImplementsPoco() public reportDate: Date;
    @ModelMeta.ImplementsPoco() public isClosed: boolean;
    public updateFromModel(updateObject: IIssueModelUpdate): IssueModel {
        return <IssueModel>this.withMutations(map => ModelBase.updateFromModel(map, updateObject));
    }
    public setId(id: string): IssueModel {
        return <IssueModel>this.set("id", id);
    }
    public setUserId(userId: string): IssueModel {
        return <IssueModel>this.set("userId", userId);
    }
    public setTitle(title: string): IssueModel {
        return <IssueModel>this.set("title", title);
    }
    public setContent(content: string): IssueModel {
        return <IssueModel>this.set("content", content);
    }
    public setReportDate(reportDate: Date): IssueModel {
        return <IssueModel>this.set("reportDate", reportDate);
    }
    public setIsClosed(isClosed: boolean): IssueModel {
        return <IssueModel>this.set("isClosed", isClosed);
    }
    constructor(initialObject?: IIssueModelUpdate = {}) {
        super(initialObject);
    }
}