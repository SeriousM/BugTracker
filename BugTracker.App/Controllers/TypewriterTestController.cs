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
        [ReturnsPoco("string")]
        [HttpGet]
        public HttpResponseMessage GetSimpleStringMessage()
        {
            return this.CreateResponse("Hello World");
        }

        [Route("api/messages/{message:string}")]
        [ReturnsPoco("string")]
        [HttpGet]
        public HttpResponseMessage GetSimpleStringMessageFromCustomRoute(string message)
        {
            return this.CreateResponse($"Received: '{message}'");
        }

        [Route("api/messages/{searchString:string=\"\"}")]
        [ReturnsModels(TypescriptIterable.List, nameof(UserModel))]
        [HttpGet]
        public HttpResponseMessage GetFilteredUserModels(string searchString = "")
        {
            var users = new List<UserModel>()
            {
                this.createUserModel("Sample User 1"),
                this.createUserModel("Sample User 2"),
                this.createUserModel("Sample User 3")
            };

            var result = new List<UserModel>(users);

            if (!string.IsNullOrEmpty(searchString))
            {
                result = users.Where(u => u.Name.Contains(searchString)).ToList();
            }

            return this.CreateResponse(result);
        }
        
        [ReturnsModel(nameof(UserModel))]
        [HttpGet]
        public HttpResponseMessage GetUserModel()
        {
            var result = this.createUserModel("Sample User");
            return this.CreateResponse(result);
        }

        [ReturnsModels(TypescriptIterable.List, nameof(UserModel))]
        [HttpGet]
        public HttpResponseMessage GetUserModels()
        {
            var result = new List<UserModel>()
            {
                this.createUserModel("Sample User 1"), this.createUserModel("Sample User 2"), this.createUserModel("Sample User 3")
            };

            return this.CreateResponse(result);
        }



        [ReturnsModel(nameof(UserModel))]
        [HttpPut]
        public HttpResponseMessage CreateNewUser(RegisterUserModel user)
        {
            // ... adding user ...

            var result = this.createUserModel(user.Username);
            return this.CreateResponse(result);

        }

        [ReturnsModels(TypescriptIterable.List, nameof(UserModel))]
        [HttpPost]
        public HttpResponseMessage ChangeUserId(List<UserModel> users, [FromBody] int index)
        {
            users[index].Id = Guid.NewGuid();

            return this.CreateResponse(users);
        }

        [HttpPost]
        public HttpResponseMessage ModifyUserWithoutResult([FromBody] UserModel user)
        {
            // ... modifing user

            return this.CreateResponse();
        }

        [HttpDelete]
        public HttpResponseMessage DeleteUser([FromUri] Guid userId)
        {
            // ... removing user

            return this.CreateResponse();
        }

        [ReturnsModel(nameof(UserModel))]
        [HttpHead]
        public HttpResponseMessage GetCreationDate()
        {
            var response = this.CreateResponse();
            response.Headers.Add("CreationDate", DateTime.Now.ToString(CultureInfo.InvariantCulture));
            return response;
        }
        
        private UserModel createUserModel(string name)
        {
            return new UserModel()
            {
                Id = Guid.NewGuid(),
                Name = name
            };
        }
    }
}