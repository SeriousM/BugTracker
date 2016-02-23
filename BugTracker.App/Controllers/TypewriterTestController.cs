using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Net.Http;
using System.Web.Http;
using BugTracker.App.Attributes;
using BugTracker.App.Controllers.Abstract;
using BugTracker.App.Models;

namespace BugTracker.App.Controllers
{
    [RoutePrefix("api/typewriter")]
    public class TypewriterTestController : ApiControllerBase
    {
        // api/TypewriterTest/GetSimpleStringMessage
        [ReturnsPoco("string")]
        [HttpGet, Route("GetSimpleStringMessage")]
        public HttpResponseMessage GetSimpleStringMessage()
        {
            return this.CreateResponse("Hello World");
        }

        // api/messages/getFilteredMessage/Hello Api
        [Route("api/messages/getMessage/{message}")]
        [ReturnsPoco("string")]
        [HttpGet, Route("GetSimpleStringMessageFromCustomRoute")]
        public HttpResponseMessage GetSimpleStringMessageFromCustomRoute(string message)
        {
            return this.CreateResponse($"Received: '{message}'");
        }

        // api/TypewriterTest/GetMessageList?messages[]=Hello&messages[]=WebApi
        [ReturnsPocos(TypescriptIterable.List, "string")]
        [HttpGet, Route("GetMessageList")]
        public HttpResponseMessage GetMessageList([FromUri][TypescriptIterableType(TypescriptIterable.List)] List<string> messages)
        {
            return this.CreateResponse(messages);
        }

        // api/messages/getFilteredMessage/User 2
        // or api/messages/getFilteredMessage
        [Route("api/messages/getFilteredMessage/{searchString=User 1}")]
        [ReturnsModels(TypescriptIterable.List, nameof(UserModel))]
        [HttpGet, Route("GetFilteredUserModels")]
        public HttpResponseMessage GetFilteredUserModels(string searchString = "User 1")
        {
            var users = new List<UserModel>()
            {
                this.CreateUserModel("Sample User 1"),
                this.CreateUserModel("Sample User 2"),
                this.CreateUserModel("Sample User 3")
            };

            var result = new List<UserModel>(users);

            if (!string.IsNullOrEmpty(searchString))
            {
                result = users.Where(u => u.Name.Contains(searchString)).ToList();
            }

            return this.CreateResponse(result);
        }

        // api/TypewriterTest/GetUserModel
        [ReturnsModel(nameof(UserModel))]
        [HttpGet, Route("GetUserModel")]
        public HttpResponseMessage GetUserModel()
        {
            var result = this.CreateUserModel("Sample User");
            return this.CreateResponse(result);
        }

        // api/TypewriterTest/GetUserModels
        [ReturnsModels(TypescriptIterable.List, nameof(UserModel))]
        [HttpGet, Route("GetUserModels")]
        public HttpResponseMessage GetUserModels()
        {
            var result = new List<UserModel>
            {
                this.CreateUserModel("Sample User 1"), this.CreateUserModel("Sample User 2"), this.CreateUserModel("Sample User 3")
            };

            return this.CreateResponse(result);
        }

        // api/TypewriterTest/CreateNewUser/?Username=Bob
        [ReturnsModel(nameof(UserModel))]
        [HttpPut, Route("CreateNewUser")]
        public HttpResponseMessage CreateNewUser([FromUri] RegisterUserModel user)
        {
            // ... adding user ...

            var result = this.CreateUserModel(user.Username);
            return this.CreateResponse(result);

        }

        // api/TypewriterTest/ChangeUserId/?Name=Bob
        // Body: "a384ed18-2036-4581-a3f5-feb95f1c4c11"
        [ReturnsModel(nameof(UserModel))]
        [HttpPost, Route("SetUserId")]
        public HttpResponseMessage SetUserId([FromUri] UserModel user, [FromBody] string newId)
        {
            //return this.CreateResponse();
            user.Id = new Guid(newId);
            return this.CreateResponse(user);
        }

        // api/TypewriterTest/ModifyUserWithoutResult
        // Body: { "name": "Bob"}
        [ReturnsVoid]
        [HttpPost, Route("ModifyUserWithoutResult")]
        public HttpResponseMessage ModifyUserWithoutResult(UserModel user)
        {
            // ... modifing user

            return this.CreateResponse();
        }

        // api/TypewriterTest/AddUsers
        // Body: [ { "name": "Bob" }, { "name": "Sally" } ]
        [ReturnsVoid]
        [HttpPost]
        public HttpResponseMessage AddUsers([TypescriptIterableType(TypescriptIterable.Stack)] List<UserModel> user)
        {
            // ... modifing user

            return this.CreateResponse();
        }

        // api/TypewriterTest/DeleteUser?userId=a384ed18-2036-4581-a3f5-feb95f1c4c11
        [ReturnsVoid]
        [HttpDelete, Route("DeleteUser")]
        public HttpResponseMessage DeleteUser(Guid userId)
        {
            // ... removing user

            return this.CreateResponse();
        }

        // api/TypewriterTest/GetCreationDate
        [ReturnsHeaderOnly]
        [HttpHead, Route("GetCreationDate")]
        public HttpResponseMessage GetCreationDate()
        {
            var response = this.CreateResponse();
            response.Headers.Add("CreationDate", DateTime.Now.ToString(CultureInfo.InvariantCulture));
            return response;
        }

        /*public HttpResponseMessage MethodeWithoutHttpVerb()
        {
            return this.CreateResponse();
        }*/

        private UserModel CreateUserModel(string name)
        {
            return new UserModel()
            {
                Id = Guid.NewGuid(),
                Name = name
            };
        }
    }
}