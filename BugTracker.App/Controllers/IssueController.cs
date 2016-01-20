using System;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;

using BugTracker.App.Commands.Repository.Abstract;
using BugTracker.App.Controllers.Abstract;
using BugTracker.App.Models;
using BugTracker.Data.Repositories.Abstract;
using BugTracker.Shared.Command.Utils.Abstract;

namespace BugTracker.App.Controllers
{
    public class IssueController : ApiControllerBase
    {
        private readonly ICommandRepository commandRepository;
        private readonly ICommandExecutor commandExecutor;
        private readonly IUserAccess userAccess;
        private readonly IIssueAccess issueAccess;

        public IssueController(
            ICommandRepository commandRepository,
            ICommandExecutor commandExecutor,
            IUserAccess userAccess,
            IIssueAccess issueAccess)
        {
            this.commandRepository = commandRepository;
            this.commandExecutor = commandExecutor;
            this.userAccess = userAccess;
            this.issueAccess = issueAccess;
        }

        [HttpPost]
        public async Task<HttpResponseMessage> Create(IssueModel issueModel)
        {
            HttpResponseMessage response;
            if (issueModel == null)
            {
                response = this.CreateErrorResponse("The issueModel is not set.", HttpStatusCode.BadRequest);
                return response;
            }

            var createNewIssueCommand = this.commandRepository.CreateNewIssue(issueModel);
            var commandResult = await this.commandExecutor.ExecuteAsync(createNewIssueCommand);

            response = this.CreateResponseFromCommandResult(commandResult);
            return response;
        }

        [HttpGet]
        public HttpResponseMessage GetAllByUser(Guid userId)
        {
            HttpResponseMessage response;
            if (userId == Guid.Empty)
            {
                response = this.CreateErrorResponse($"The userId '{userId}' is invalid.", HttpStatusCode.BadRequest);
                return response;
            }

            var maybeUser = this.userAccess.TryGetById(userId);
            if (maybeUser.HasNoValue)
            {
                response = this.CreateErrorResponse($"The user with id {userId} was not found.", HttpStatusCode.NotFound);
                return response;
            }

            var issues = this.issueAccess.GetAllByUserId(userId);

            response = this.CreateResponse(issues);
            return response;
        }
    }
}
