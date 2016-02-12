import { List } from 'immutable';

import { IAction, AppState, IssueModel } from "../../../store/appStore.base";
import { IssueStoreActionTypes, IAddIssueAction } from "./issueStoreActions";

const addIssue = (state:List<IssueModel>, action:IAddIssueAction) : List<IssueModel> => {
    var newState = state.push(new IssueModel(action.title))
    return newState;
}

export const issueStoreReducer = (state:List<IssueModel> = List<IssueModel>(), action:IAction<IssueStoreActionTypes>) : List<IssueModel> => {
    switch (action.type) {
        case IssueStoreActionTypes.ADD_ISSUE:
            return addIssue(state, <IAddIssueAction>action);
        default:
            return state;
    }
}