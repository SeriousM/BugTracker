import { GeneratedAppState, IReducerGeneratedAppState } from "./generated/appState";
import * as ModelMeta from '../utils/model/meta';
import * as Models from './models';

export interface IReducerAppState extends IReducerGeneratedAppState {
    sessionState: (state: any, action: any) => any;
}

export class AppState extends GeneratedAppState implements ModelMeta.IClassHasMetaImplements
{
    @ModelMeta.ImplementsModel(() => Models.SessionStateModel ) public sessionState: Models.SessionStateModel;    
}