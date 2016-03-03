import { List } from 'immutable';

import { IAction } from "../../../store/appStore.base";
import { AppState, SessionStateModel } from "../../../models/models";
import { SessionStateActionTypes, IChangeIssuesLoadedStateAction } from "./sessionStateStoreActions";

function changeIssueLoadedState(state: SessionStateModel, action: IChangeIssuesLoadedStateAction): SessionStateModel {
    var newState = state.setHasIssuesLoaded(action.payload.hasLoaded);
    return newState;
}

export function sessionStateStoreReducer(state: SessionStateModel = new SessionStateModel(), action: IAction): SessionStateModel {
    switch (action.type) {
        case SessionStateActionTypes.CHANGE_ISSUES_LOADED_STATE:
            return changeIssueLoadedState(state, <IChangeIssuesLoadedStateAction>action);        
        default:
            return state;
    }
}