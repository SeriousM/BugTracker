import * as Immutable from 'immutable';
import * as ModelMeta from '../../utils/model/meta';
import * as Models from '../models';

interface IIssueModel {
    id: string;
    userId: string;
    title: string;
    content: string;
    setId(id: string): IssueModel;
    setUserId(userId: string): IssueModel;
    setTitle(title: string): IssueModel;
    setContent(content: string): IssueModel;
}

const IssueModelRecord = Immutable.Record(<IIssueModel>{
    id: <string>null,
    userId: <string>null,
    title: <string>null,
    content: <string>null
});

@ModelMeta.ImplementsClass(IssueModelRecord)
export class IssueModel extends IssueModelRecord implements IIssueModel {
    @ModelMeta.ImplementsPoco() public id: string;
    @ModelMeta.ImplementsPoco() public userId: string;
    @ModelMeta.ImplementsPoco() public title: string;
    @ModelMeta.ImplementsPoco() public content: string;
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
    constructor() {
        super({});
    }
}