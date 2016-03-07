import { provide } from "angular2/core";
import { IssueDataAccess } from './issueDataAccess'

export var DATA_ACCESS: Array<any> = [
  provide(IssueDataAccess, {useClass: IssueDataAccess}),
];