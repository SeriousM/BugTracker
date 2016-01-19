using System;
using System.Net;
using System.Threading.Tasks;
using System.Web.Http;

using BugTracker.App.Commands.Repository;
using BugTracker.App.Controllers.Abstract;
using BugTracker.App.Models;
using BugTracker.Data.Entities;
using BugTracker.Data.Repositories.Abstract;
using BugTracker.Shared.Assertions;
using BugTracker.Shared.Command.Utils.Abstract;

namespace BugTracker.App.Controllers
{
    public class UserController : ApiControllerBase
    {
        private readonly CommandRepository commandRepository;
        private readonly ICommandExecutor commandExecutor;
        private readonly IUserAccess userAccess;

        public UserController(CommandRepository commandRepository, ICommandExecutor commandExecutor, IUserAccess userAccess)
        {
            this.commandRepository = commandRepository;
            this.commandExecutor = commandExecutor;
            this.userAccess = userAccess;
        }

        [HttpPost]
        public async Task<User> Register(RegisterUserModel registrationModel)
        {
            HttpCheck.IsNotNull(nameof(registrationModel), registrationModel, HttpStatusCode.BadRequest);

            var registerNewUserCommand = this.commandRepository.RegisterNewUser(registrationModel);
            var commandResult = await this.commandExecutor.ExecuteAsync(registerNewUserCommand);

            this.ValidateCommandResult(commandResult);
            return commandResult.SuccessData;
        }

        [HttpGet]
        public User Get(Guid id)
        {
            HttpCheck.IsTrue(id == Guid.Empty, HttpStatusCode.BadRequest, $"The id '{id}' is invalid.");

            var maybeUser = this.userAccess.TryGetById(id);

            HttpCheck.IsNotNull(maybeUser.Value, HttpStatusCode.NotFound, $"The user with id '{id}' does not exist.");

            return maybeUser.Value;
        }
    }
}