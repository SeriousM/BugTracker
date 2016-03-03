import { List } from 'immutable';

import { IAction } from "../../../store/appStore.base";
import { AppState, IssueModel } from "../../../models/models";
import { IssueStoreActionTypes, IAddIssueAction, IUpdateIssueAction, IChangeTitleAction } from "./issueStoreActions";

function updateIssue(state: List<IssueModel>, action: IUpdateIssueAction): List<IssueModel> {
    var itemIndex = state.findIndex(x => x.id == action.payload.issue.id);
    if (itemIndex < 0) {
        return state;
    }
    var newState = state.set(itemIndex, action.payload.issue);
    return newState;
}
function addIssue(state: List<IssueModel>, action: IAddIssueAction): List<IssueModel> {
    var newState = state.push(action.payload.issue);
    return newState;
}
function changeTitle(state: List<IssueModel>, action: IChangeTitleAction): List<IssueModel> {
    var newState = state.map(issueModel => issueModel.setTitle(action.payload.title)).toList();
    return newState;
}

export function issueStoreReducer(state: List<IssueModel> = List<IssueModel>(), action: IAction): List<IssueModel> {
    switch (action.type) {
        case IssueStoreActionTypes.ADD_ISSUE:
            return addIssue(state, <IAddIssueAction>action);
        case IssueStoreActionTypes.UPDATE_ISSUE:
            return updateIssue(state, <IUpdateIssueAction>action);
        case IssueStoreActionTypes.CHANGE_TITLE:
            return changeTitle(state, <IChangeTitleAction>action);
        default:
            return state;
    }
}