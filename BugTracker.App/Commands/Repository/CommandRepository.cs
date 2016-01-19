using BugTracker.App.Models;
using BugTracker.Data.Entities;
using BugTracker.Shared.Command.Abstract;
using BugTracker.Shared.Command.Utils.Abstract;

namespace BugTracker.App.Commands.Repository
{
    public class CommandRepository
    {
        private readonly ICommandFactory commandFactory;

        public CommandRepository(ICommandFactory commandFactory)
        {
            this.commandFactory = commandFactory;
        }

        public CommandBase<User> RegisterNewUser(RegisterUserModel registrationModel)
        {
            RegisterNewUserCommand command = this.commandFactory.CreateCommand<RegisterNewUserCommand, User>();
            command.Initialize(registrationModel);
            return command;
        }
    }
}