import { IAction, createAction } from "../../../store/appStore.base";
import { IssueModel } from "../../../models/models";

const actionPrefix = "ISSUES.";
export class IssueStoreActionTypes {
    public static ADD_ISSUE = actionPrefix + "ADD_ISSUE";
    public static CHANGE_TITLE = actionPrefix + "CHANGE_TITLE";
}
export class IssueStoreActions {
    public static AddIssue = (issueModel: IssueModel): IAddIssueAction => {
        return createAction<IAddIssueAction>(IssueStoreActionTypes.ADD_ISSUE, { issue: issueModel });
    }
    public static ChangeTitle = (title: string): IChangeTitleAction => {
        return createAction<IChangeTitleAction>(IssueStoreActionTypes.CHANGE_TITLE, { title: title });
    }
}
export interface IAddIssueAction extends IAction {
    payload: { issue: IssueModel };
}
export interface IChangeTitleAction extends IAction {
    payload: { title: string };
}