import { provide } from "angular2/core";
import { IssueService } from './generated/issueController';
import { UserService } from './generated/userController';
import { TypewriterTestService } from './generated/typewriterTestController';

export { IssueService } from './generated/issueController';
export { UserService } from './generated/userController';
export { TypewriterTestService } from './generated/typewriterTestController';

export const APP_WEBSERVICES: any[] = [
    provide(IssueService, { useClass: IssueService }),
    provide(UserService, { useClass: UserService }),
    provide(TypewriterTestService, { useClass: TypewriterTestService })
];