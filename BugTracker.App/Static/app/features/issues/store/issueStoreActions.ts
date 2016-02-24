import { IAction, createAction } from "../../../store/appStore.base";

const actionPrefix = "ISSUES.";
export class IssueStoreActionTypes {
    public static ADD_ISSUE = actionPrefix + "ADD_ISSUE";
    public static CHANGE_TITLE = actionPrefix + "CHANGE_TITLE";
}
export class IssueStoreActions {
    public static AddIssue = (title: string): IAddIssueAction => {
        return createAction<IAddIssueAction>(IssueStoreActionTypes.ADD_ISSUE, { title: title });
    }
    public static ChangeTitle = (title: string): IChangeTitleAction => {
        return createAction<IChangeTitleAction>(IssueStoreActionTypes.CHANGE_TITLE, { title: title });
    }
}
export interface IAddIssueAction extends IAction {
    payload: { title: string };
}
export interface IChangeTitleAction extends IAction {
    payload: { title: string };
}