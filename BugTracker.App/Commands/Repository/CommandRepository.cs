using BugTracker.App.Commands.Repository.Abstract;
using BugTracker.App.Models;
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

        public CommandBase<UserModel> RegisterNewUser(RegisterUserModel registrationModel)
        {
            var command = this.commandFactory.CreateCommand<RegisterNewUserCommand, UserModel>();
            command.Initialize(registrationModel);
            return command;
        }

        public CommandBase<UserModel> RegisterNewUserIfUnknown(RegisterUserModel registrationModel)
        {
            var command = this.commandFactory.CreateCommand<RegisterNewUserIfUnknownCommand, UserModel>();
            command.Initialize(registrationModel);
            return command;
        }

        public CommandBase<IssueModel> CreateNewIssue(IssueModel issueModel)
        {
            var command = this.commandFactory.CreateCommand<CreateNewIssueCommand, IssueModel>();
            command.Initialize(issueModel);
            return command;
        }

        public CommandBase UpdateIssue(IssueModel issueModel)
        {
            var command = this.commandFactory.CreateCommand<UpdateIssueCommand>();
            command.Initialize(issueModel);
            return command;
        }
    }
}