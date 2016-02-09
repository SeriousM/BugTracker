import { IAction } from "../../store/appStore.base";

export enum IssueStoreActionTypes {
    ADD_ISSUE
}
export class IssueStoreActions {
    public static AddIssue = (title:string) : IAddIssueAction => {
        return {type: IssueStoreActionTypes.ADD_ISSUE, title: title};
    }
}
export interface IAddIssueAction extends IAction<IssueStoreActionTypes>{
    title:string;
}