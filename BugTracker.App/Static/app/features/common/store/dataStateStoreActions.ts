import { IAction, createAction } from "../../../store/appStore.base";
import { IssueModel } from "../../../models/models";

const actionPrefix = "DATASTATE.";
export class DataStateActionTypes {
    public static CHANGE_ISSUES_LOADED_STATE = actionPrefix + "CHANGE_ISSUES_LOADED_STATE";
}
export class DataStateActions {
    public static ChangeIssueLoadedState = (issuesLoaded: boolean): IChangeIssuesLoadedStateAction => {
        return createAction<IChangeIssuesLoadedStateAction>(DataStateActionTypes.CHANGE_ISSUES_LOADED_STATE, { issuesLoaded: issuesLoaded });
    }
}
export interface IChangeIssuesLoadedStateAction extends IAction {
    payload: { issuesLoaded: boolean };
}