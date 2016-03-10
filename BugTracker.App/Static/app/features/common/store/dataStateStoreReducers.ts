import { List } from 'immutable';

import { IAction } from "../../../store/appStore.base";
import { AppState, DataStateModel } from "../../../models/models";
import { DataStateActionTypes, IChangeIssuesLoadedStateAction } from "./dataStateStoreActions";

function changeIssueLoadedState(state: DataStateModel, action: IChangeIssuesLoadedStateAction): DataStateModel {
    var newState = state.setAreIssuesLoaded(action.payload.issuesLoaded);
    return newState;
}

export function dataStateStoreReducer(state: DataStateModel = new DataStateModel(), action: IAction): DataStateModel {
    switch (action.type) {
        case DataStateActionTypes.CHANGE_ISSUES_LOADED_STATE:
            return changeIssueLoadedState(state, <IChangeIssuesLoadedStateAction>action);
        default:
            return state;
    }
}