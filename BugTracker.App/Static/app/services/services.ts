import { provide } from "angular2/core";
import { IssueService } from './generated/issueService';
import { UserService } from './generated/userService';
import { TypewriterTestService } from './generated/typewriterTestService';

export { IssueService, UserService, TypewriterTestService };

export const APP_WEBSERVICES: any[] = [
    provide(IssueService, { useClass: IssueService }),
    provide(UserService, { useClass: UserService }),
    provide(TypewriterTestService, { useClass: TypewriterTestService })
];