using System;
using System.Net;
using System.Net.Http;

using BugTracker.App.Commands.Repository.Abstract;
using BugTracker.App.Controllers;
using BugTracker.App.Models;
using BugTracker.Data.Entities;
using BugTracker.Data.Repositories.Abstract;
using BugTracker.Shared;
using BugTracker.Shared.Command.Entities;

using Moq;

using NUnit.Framework;

namespace BugTracker.Tests.App.Controllers
{
    [TestFixture]
    public class UserControllerTests : TestBase
    {
        private UserController controller;
        private Mock<ICommandRepository> commandRepositoryMock;
        private Mock<IUserAccess> userAccessMock;

        [SetUp]
        public void Setup()
        {
            this.commandRepositoryMock = this.CreateMockAndRegisterInDI<ICommandRepository>(MockBehavior.Strict);
            this.userAccessMock = this.CreateMockAndRegisterInDI<IUserAccess>(MockBehavior.Strict);
            this.controller = this.ResolveApiController<UserController>();
        }

        [Test]
        public async void Register_WithNullModel_ReturnsBadRequest()
        {
            // arrange
            RegisterUserModel registrationModel = null;

            // act
            var response = await this.controller.Register(registrationModel);

            // assert
            Assert.AreEqual(HttpStatusCode.BadRequest, response.StatusCode);
        }

        [Test]
        public async void Register_WithValidModel_ReturnsOk()
        {
            // arrange
            this.commandRepositoryMock
                .Setup(x => x.RegisterNewUser(It.IsNotNull<RegisterUserModel>()))
                .Returns(this.CreateCommandMock(new CommandResult<UserModel>(true, new UserModel())));
            RegisterUserModel registrationModel = new RegisterUserModel();

            // act
            var response = await this.controller.Register(registrationModel);

            // assert
            Assert.AreEqual(HttpStatusCode.OK, response.StatusCode);
            UserModel createdUser;
            Assert.IsTrue(response.TryGetContentValue(out createdUser));
        }

        [Test]
        public async void RegisterIfUnknown_WithNullModel_ReturnsBadRequest()
        {
            // arrange
            RegisterUserModel registrationModel = null;

            // act
            var response = await this.controller.RegisterIfUnknown(registrationModel);

            // assert
            Assert.AreEqual(HttpStatusCode.BadRequest, response.StatusCode);
        }

        [Test]
        public async void RegisterIfUnknown_WithValidModel_ReturnsOk()
        {
            // arrange
            this.commandRepositoryMock
                .Setup(x => x.RegisterNewUserIfUnknown(It.IsNotNull<RegisterUserModel>()))
                .Returns(this.CreateCommandMock(new CommandResult<UserModel>(true, new UserModel())));
            RegisterUserModel registrationModel = new RegisterUserModel();

            // act
            var response = await this.controller.RegisterIfUnknown(registrationModel);

            // assert
            Assert.AreEqual(HttpStatusCode.OK, response.StatusCode);
            UserModel createdUser;
            Assert.IsTrue(response.TryGetContentValue(out createdUser));
        }

        [Test]
        public void Get_WithInvalidId_ReturnsBadRequest()
        {
            // arrange
            var id = Guid.Empty;

            // act
            var response = this.controller.Get(id);

            // assert
            Assert.AreEqual(HttpStatusCode.BadRequest, response.StatusCode);
        }

        [Test]
        public void Get_WithUnknownId_ReturnsOk()
        {
            // arrange
            var id = Guid.NewGuid();
            this.userAccessMock.Setup(x => x.TryGetById(id)).Returns(Maybe<User>.Empty);

            // act
            var response = this.controller.Get(id);

            // assert
            Assert.AreEqual(HttpStatusCode.NotFound, response.StatusCode);
        }

        [Test]
        public void Get_WithKnownId_ReturnsOk()
        {
            // arrange
            var id = Guid.NewGuid();
            var existingUser = new User {Id = id};
            this.userAccessMock.Setup(x => x.TryGetById(id)).Returns(new Maybe<User>(existingUser));

            // act
            var response = this.controller.Get(id);

            // assert
            Assert.AreEqual(HttpStatusCode.OK, response.StatusCode);
            User user;
            Assert.IsTrue(response.TryGetContentValue(out user));
            Assert.AreEqual(id, user.Id);
        }
    }
}