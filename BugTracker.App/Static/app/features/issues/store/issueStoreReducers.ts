import { List } from 'immutable';

import { IAction, AppState } from "../../../store/appStore.base";
import { IssueModel } from "../../../store/storeModels";
import { IssueStoreActionTypes, IAddIssueAction, IChangeTitleAction } from "./issueStoreActions";

function addIssue(state: List<IssueModel>, action: IAddIssueAction): List<IssueModel> {
    var newState = state.push(new IssueModel(action.title));
    return newState;
}
function changeTitle(state: List<IssueModel>, action: IChangeTitleAction): List<IssueModel> {
    var newState = state.map(issueModel => issueModel.setTitle(action.title)).toList();
    return newState;
}

export function issueStoreReducer(state: List<IssueModel> = List<IssueModel>(), action: IAction<IssueStoreActionTypes>): List<IssueModel> {
    switch (action.type) {
        case IssueStoreActionTypes.ADD_ISSUE:
            return addIssue(state, <IAddIssueAction>action);
        case IssueStoreActionTypes.CHANGE_TITLE:
            return changeTitle(state, <IChangeTitleAction>action);
        default:
            return state;
    }
}