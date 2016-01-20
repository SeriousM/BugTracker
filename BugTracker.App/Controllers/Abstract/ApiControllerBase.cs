using System.Net;
using System.Net.Http;
using System.Web.Http;

using BugTracker.Shared.Command.Entities;

namespace BugTracker.App.Controllers.Abstract
{
    public abstract class ApiControllerBase : ApiController
    {
        protected HttpResponseMessage CreateErrorResponse(string message, HttpStatusCode httpStatusCode)
        {
            var httpError = new HttpError(message);
            var errorResponse = this.Request.CreateResponse(httpStatusCode, httpError);
            return errorResponse;
        }

        protected HttpResponseMessage CreateResponse<T>(T value, HttpStatusCode httpStatusCode = HttpStatusCode.OK)
        {
            var response = this.Request.CreateResponse(value);
            return response;
        }

        protected HttpResponseMessage CreateResponseFromCommandResult(CommandResult commandResult)
        {
            HttpResponseMessage response;

            if (commandResult.IsSuccess)
            {
                response = this.Request.CreateResponse(HttpStatusCode.OK);
            }
            else
            {
                response = this.CreateErrorResponse(commandResult.ErrorMessage, HttpStatusCode.InternalServerError);
            }

            return response;
        }

        protected HttpResponseMessage CreateResponseFromCommandResult<T>(CommandResult<T> commandResult)
        {
            HttpResponseMessage response;

            if (commandResult.IsSuccess)
            {
                response = this.Request.CreateResponse(HttpStatusCode.OK, commandResult.SuccessData);
            }
            else
            {
                response = this.CreateErrorResponse(commandResult.ErrorMessage, HttpStatusCode.InternalServerError);
            }

            return response;
        }
    }
}