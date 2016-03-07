using System;
using BugTracker.App.Models;
using BugTracker.Shared.Command.Abstract;

namespace BugTracker.App.Commands.Repository.Abstract
{
    public interface ICommandRepository
    {
        CommandBase<IssueModel> GetIssueById(Guid issueId);
        CommandBase<UserModel> RegisterNewUser(RegisterUserModel registrationModel);
        CommandBase<UserModel> RegisterNewUserIfUnknown(RegisterUserModel registrationModel);
        CommandBase<IssueModel> CreateNewIssue(IssueModel issueModel);
        CommandBase UpdateIssue(IssueModel issueModel);
    }
}