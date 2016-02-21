import * as Immutable from 'immutable';
import { getVariableName } from '../utils/reflection';
import { ImplementsClass, ImplementsModel, ImplementsModels, ImplementsPoco } from '../utils/model/meta';
import * as Models from './models';

interface IIssueModel {
    id: string;
    userId: string;
    title: string;
    content: string;
    setId(value: string): IssueModel;
    setUserId(value: string): IssueModel;
    setTitle(value: string): IssueModel;
    setContent(value: string): IssueModel;
}

const IssueModelRecord = Immutable.Record(<IIssueModel>{
    id: <string>null,
    userId: <string>null,
    title: <string>null,
    content: <string>null
});

@ImplementsClass(IssueModelRecord)
export class IssueModel extends IssueModelRecord implements IIssueModel {
    @ImplementsPoco() public id: string;
    @ImplementsPoco() public userId: string;
    @ImplementsPoco() public title: string;
    @ImplementsPoco() public content: string;
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