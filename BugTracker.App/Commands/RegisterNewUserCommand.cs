using System.Threading.Tasks;

using BugTracker.App.Models;
using BugTracker.Data.Repositories.Abstract;
using BugTracker.Shared.Command.Abstract;
using BugTracker.Shared.Command.Entities;
using BugTracker.Shared.Extensions;

namespace BugTracker.App.Commands
{
    internal class RegisterNewUserCommand : CommandBase<UserModel>
    {
        private readonly IUserAccess userAccess;
        private RegisterUserModel registrationModel;

        public RegisterNewUserCommand(IUserAccess userAccess)
        {
            this.userAccess = userAccess;
        }

        public void Initialize(RegisterUserModel registrationModel)
        {
            this.registrationModel = registrationModel;
        }

        protected override Task<CanExecuteCommandResult> CanExecuteAsync()
        {
            if (this.registrationModel == null)
            {
                return this.CannotExecute("The registrationmodel is null.").ToTaskResult();
            }
            if (string.IsNullOrWhiteSpace(this.registrationModel.Username))
            {
                return this.CannotExecute($"The username '{this.registrationModel.Username}' is null or in a wrong format.").ToTaskResult();
            }
            this.registrationModel.Username = this.registrationModel.Username.Trim();

            return base.CanExecuteAsync();
        }

        protected override Task<CommandResult<UserModel>> ExecuteAsync()
        {
            var usernameToRegister = this.registrationModel.Username;

            var maybeExistingUser = this.userAccess.TryGetByName(usernameToRegister);
            if (maybeExistingUser.HasValue)
            {
                return this.ExecutionError($"The username '{usernameToRegister}' is already registered.").ToTaskResult();
            }

            var registeredUser = this.userAccess.Add(usernameToRegister);
            var model = UserModel.FromUser(registeredUser);

            return this.SuccessExecution(model).ToTaskResult();
        }
    }
}