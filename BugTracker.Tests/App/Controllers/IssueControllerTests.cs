using System;
using System.Collections.Generic;
using System.Linq;
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
    public class IssueControllerTests : TestBase
    {
        private IssueController controller;
        private Mock<ICommandRepository> commandRepositoryMock;
        private Mock<IUserAccess> userAccessMock;
        private Mock<IIssueAccess> issueAccessMock;

        [SetUp]
        public void Setup()
        {
            this.commandRepositoryMock = this.CreateMockAndRegisterInDI<ICommandRepository>(MockBehavior.Strict);
            this.userAccessMock = this.CreateMockAndRegisterInDI<IUserAccess>(MockBehavior.Strict);
            this.issueAccessMock = this.CreateMockAndRegisterInDI<IIssueAccess>(MockBehavior.Strict);
            this.controller = this.ResolveApiController<IssueController>();
        }

        [Test]
        public async void Create_WithNullModel_ReturnsBadRequest()
        {
            // arrange
            IssueModel issueModel = null;

            // act
            var response = await this.controller.Create(issueModel);

            // assert
            Assert.AreEqual(HttpStatusCode.BadRequest, response.StatusCode);
        }

        [Test]
        public async void Create_WithValidModel_ReturnsOk()
        {
            // arrange
            this.commandRepositoryMock
                .Setup(x => x.CreateNewIssue(It.IsNotNull<IssueModel>()))
                .Returns(this.CreateCommandMock(new CommandResult<Issue>(true, new Issue())));
            IssueModel issueModel = new IssueModel();

            // act
            var response = await this.controller.Create(issueModel);

            // assert
            Assert.AreEqual(HttpStatusCode.OK, response.StatusCode);
            Issue createdIssue;
            Assert.IsTrue(response.TryGetContentValue(out createdIssue));
        }

        [Test]
        public void GetAllByUser_WithInvalidUserId_ReturnsBadRequest()
        {
            // arrange
            var userId = Guid.Empty;

            // act
            var response = this.controller.GetAllByUser(userId);

            // assert
            Assert.AreEqual(HttpStatusCode.BadRequest, response.StatusCode);
        }

        [Test]
        public void Get_WithUnknownUserId_ReturnsOk()
        {
            // arrange
            var userId = Guid.NewGuid();
            this.userAccessMock.Setup(x => x.TryGetById(userId)).Returns(Maybe<User>.Empty);

            // act
            var response = this.controller.GetAllByUser(userId);

            // assert
            Assert.AreEqual(HttpStatusCode.NotFound, response.StatusCode);
        }

        [Test]
        public void GetAllByUser_WithKnownUserId_ReturnsOk()
        {
            // arrange
            var userId = Guid.NewGuid();
            var existingUser = new User {Id = userId};
            this.userAccessMock.Setup(x => x.TryGetById(userId)).Returns(new Maybe<User>(existingUser));
            this.issueAccessMock.Setup(x => x.GetAllByUserId(userId)).Returns(Enumerable.Empty<Issue>().ToList());

            // act
            var response = this.controller.GetAllByUser(userId);

            // assert
            Assert.AreEqual(HttpStatusCode.OK, response.StatusCode);
            List<Issue> issues;
            Assert.IsTrue(response.TryGetContentValue(out issues));
        }
    }
}