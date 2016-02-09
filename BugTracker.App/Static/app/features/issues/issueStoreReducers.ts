import { IAction, AppState, IssueModel } from "../../store/appStore.base";
import { IssueStoreActionTypes, IAddIssueAction } from "./issueStoreActions";

const addIssue = (state:Array<IssueModel>, action:IAddIssueAction) : Array<IssueModel> => {
    var newState = state.concat(new IssueModel(action.title))
    return newState;
}

export const issueStoreReducer = (state:Array<IssueModel> = [], action:IAction<IssueStoreActionTypes>) : Array<IssueModel> => {
    switch (action.type) {
        case IssueStoreActionTypes.ADD_ISSUE:
            return addIssue(state, <IAddIssueAction>action);
        default:
            return state;
    }
}