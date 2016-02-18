using BugTracker.App.Models;
using BugTracker.Data.Entities;
using BugTracker.Shared.Command.Abstract;

namespace BugTracker.App.Commands.Repository.Abstract
{
    public interface ICommandRepository {
        CommandBase<User> RegisterNewUser(RegisterUserModel registrationModel);
        CommandBase<User> RegisterNewUserIfUnknown(RegisterUserModel registrationModel);
        CommandBase<Issue> CreateNewIssue(IssueModel issueModel);
    }
}