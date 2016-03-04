import { IAction, createAction } from "../../../store/appStore.base";
import { IssueModel } from "../../../models/models";

const actionPrefix = "SESSIONSTATE.";
export class SessionStateActionTypes {
    public static CHANGE_ISSUES_LOADED_STATE = actionPrefix + "CHANGE_ISSUES_LOADED_STATE";
}
export class SessionStateActions {
    public static ChangeIssueLoadedState = (issuesLoaded: boolean): IChangeIssuesLoadedStateAction => {
        return createAction<IChangeIssuesLoadedStateAction>(SessionStateActionTypes.CHANGE_ISSUES_LOADED_STATE, { issuesLoaded: issuesLoaded });
    }
}
export interface IChangeIssuesLoadedStateAction extends IAction {
    payload: { issuesLoaded: boolean };
}