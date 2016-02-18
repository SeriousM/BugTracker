using BugTracker.App.Commands.Repository.Abstract;
using BugTracker.App.Models;
using BugTracker.Data.Entities;
using BugTracker.Shared.Command.Abstract;
using BugTracker.Shared.Command.Utils.Abstract;

namespace BugTracker.App.Commands.Repository
{
    public class CommandRepository : ICommandRepository
    {
        private readonly ICommandFactory commandFactory;

        public CommandRepository(ICommandFactory commandFactory)
        {
            this.commandFactory = commandFactory;
        }

        public CommandBase<User> RegisterNewUser(RegisterUserModel registrationModel)
        {
            var command = this.commandFactory.CreateCommand<RegisterNewUserCommand, User>();
            command.Initialize(registrationModel);
            return command;
        }

        public CommandBase<User> RegisterNewUserIfUnknown(RegisterUserModel registrationModel)
        {
            var command = this.commandFactory.CreateCommand<RegisterNewUserIfUnknownCommand, User>();
            command.Initialize(registrationModel);
            return command;
        }

        public CommandBase<Issue> CreateNewIssue(IssueModel issueModel)
        {
            var command = this.commandFactory.CreateCommand<CreateNewIssueCommand, Issue>();
            command.Initialize(issueModel);
            return command;
        }
    }
}