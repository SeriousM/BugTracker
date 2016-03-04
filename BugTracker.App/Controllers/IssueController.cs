using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;
using BugTracker.App.Attributes;
using BugTracker.App.Commands.Repository.Abstract;
using BugTracker.App.Controllers.Abstract;
using BugTracker.App.Models;
using BugTracker.Data.Repositories.Abstract;
using BugTracker.Shared.Command.Utils.Abstract;

namespace BugTracker.App.Controllers
{
    [RoutePrefix("api/issue")]
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

        [ReturnsModel(nameof(IssueModel))]
        [HttpPost, Route("Create")]
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

        [ReturnsVoid]
        [HttpPut, Route("Update")]
        public async Task<HttpResponseMessage> Update(IssueModel issueModel)
        {
            HttpResponseMessage response;
            if (issueModel == null)
            {
                response = this.CreateErrorResponse("The issueModel is not set.", HttpStatusCode.BadRequest);
                return response;
            }

            var updateIssueCommand = this.commandRepository.UpdateIssue(issueModel);
            var commandResult = await this.commandExecutor.ExecuteAsync(updateIssueCommand);

            response = this.CreateResponseFromCommandResult(commandResult);
            return response;
        }


        [ReturnsModels(TypescriptIterable.List, nameof(IssueModel))]
        [HttpGet, Route("GetAllByUser")]
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

            // transform Issue Entity to Issue Model
            var result = issues.Select(issue => new IssueModel
            {
                Id = issue.Id, UserId = issue.UserId, Content = issue.Content, IsClosed = issue.IsClosed, ReportDate = issue.ReportDate, Title = issue.Title
            }).ToList();

            response = this.CreateResponse(result);
            return response;
        }
    }
}
