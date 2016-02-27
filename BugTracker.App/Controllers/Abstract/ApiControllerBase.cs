using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;
using BugTracker.Shared.Command.Entities;

namespace BugTracker.App.Controllers.Abstract
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public abstract class ApiControllerBase : ApiController
    {
        protected HttpResponseMessage CreateErrorResponse(string message, HttpStatusCode httpStatusCode)
        {
            var httpError = new HttpError(message);
            var errorResponse = this.Request.CreateErrorResponse(httpStatusCode, httpError);
            return errorResponse;
        }

        protected HttpResponseMessage CreateResponse<T>(T value, HttpStatusCode httpStatusCode = HttpStatusCode.OK)
        {
            var response = this.Request.CreateResponse(httpStatusCode,value);
            return response;
        }

        protected HttpResponseMessage CreateResponse(HttpStatusCode httpStatusCode = HttpStatusCode.OK)
        {
            var response = this.Request.CreateResponse(httpStatusCode);
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