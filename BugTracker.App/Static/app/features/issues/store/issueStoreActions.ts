import { IAction } from "../../../store/appStore.base";

const actionPrefix = "ISSUES.";
export class IssueStoreActionTypes {
    public static ADD_ISSUE = actionPrefix + "ADD_ISSUE";    
    public static CHANGE_TITLE = actionPrefix + "CHANGE_TITLE";
}
export class IssueStoreActions {
    public static AddIssue = (title: string): IAddIssueAction => {
        return { type: IssueStoreActionTypes.ADD_ISSUE, title: title };
    }
    public static ChangeTitle = (title: string): IChangeTitleAction => {
        return { type: IssueStoreActionTypes.CHANGE_TITLE, title: title };
    }
}
export interface IAddIssueAction extends IAction<IssueStoreActionTypes> {
    title: string;
}
export interface IChangeTitleAction extends IAction<IssueStoreActionTypes> {
    title: string;
}