using System.Net;
using System.Net.Http;
using System.Web.Http;

using BugTracker.Shared.Command.Entities;

namespace BugTracker.App.Controllers.Abstract
{
    public abstract class ApiControllerBase
    {
        protected void ValidateCommandResult(CommandResult commandResult)
        {
            if (commandResult.IsFailure)
            {
                var httpResponseMessage = new HttpResponseMessage(HttpStatusCode.InternalServerError) { ReasonPhrase = commandResult.ErrorMessage };
                throw new HttpResponseException(httpResponseMessage);
            }
        }
    }
}