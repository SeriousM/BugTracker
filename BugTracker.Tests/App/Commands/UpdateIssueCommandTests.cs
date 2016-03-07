using System;

using BugTracker.App.Commands.Repository;
using BugTracker.App.Models;
using BugTracker.Data.Entities;
using BugTracker.Data.Repositories.Abstract;
using BugTracker.Shared;

using Moq;

using NUnit.Framework;

namespace BugTracker.Tests.App.Commands
{
    [TestFixture]
    public class UpdateIssueCommandTests : TestBase
    {
        private CommandRepository commandRepository;
        private Mock<IIssueAccess> issueAccessMock;
        private Mock<IUserAccess> userAccessMock;

        [SetUp]
        public void Setup()
        {
            this.commandRepository = this.Resolve<CommandRepository>();
            this.issueAccessMock = this.CreateMockAndRegisterInDI<IIssueAccess>(MockBehavior.Strict);
            this.userAccessMock = this.CreateMockAndRegisterInDI<IUserAccess>(MockBehavior.Strict);
        }

        [Test]
        public async void Initialize_WithNull_NotSuccessful()
        {
            // arrange
            IssueModel issueModel = null;
            var command = this.commandRepository.UpdateIssue(issueModel);

            // act
            var commandResult = await this.CommandExecutor.ExecuteAsync(command);

            // assert
            CommandAssert.IsFailure(commandResult);
        }

        [Test]
        public async void Execute_WithNullTitle_NotSuccessful()
        {
            // arrange
            var issueModel = new IssueModel
            {
                UserId = Guid.NewGuid(),
                Title = null,
                Content = "content"
            };

            var command = this.commandRepository.UpdateIssue(issueModel);

            // act
            var commandResult = await this.CommandExecutor.ExecuteAsync(command);

            // assert
            CommandAssert.IsFailure(commandResult);
        }

        [Test]
        public async void Execute_WithNullContent_NotSuccessful()
        {
            // arrange
            var issueModel = new IssueModel
            {
                UserId = Guid.NewGuid(),
                Title = "title",
                Content = null
            };

            var command = this.commandRepository.UpdateIssue(issueModel);

            // act
            var commandResult = await this.CommandExecutor.ExecuteAsync(command);

            // assert
            CommandAssert.IsFailure(commandResult);
        }

        [Test]
        public async void Execute_WithUnknownUser_NotSuccessful()
        {
            // arrange
            var issueModel = new IssueModel
            {
                UserId = Guid.NewGuid(),
                Title = "title",
                Content = "content"
            };
            this.userAccessMock
                .Setup(x => x.TryGetById(issueModel.UserId))
                .Returns(Maybe<User>.Empty);

            var command = this.commandRepository.UpdateIssue(issueModel);

            // act
            var commandResult = await this.CommandExecutor.ExecuteAsync(command);

            // assert
            CommandAssert.IsFailure(commandResult);
        }

        [Test]
        public async void Execute_WithCorrectModel_Successful()
        {
            // arrange
            var issueModel = new IssueModel
            {
                UserId = Guid.NewGuid(),
                Title = "title",
                Content = "content"
            };

            User existingUser = new User { Id = issueModel.UserId };
            this.userAccessMock
                .Setup(x => x.TryGetById(issueModel.UserId))
                .Returns(new Maybe<User>(existingUser));

            this.issueAccessMock
                .Setup(x => x.Update(issueModel.Id, issueModel.Title, issueModel.Content, false));

            var command = this.commandRepository.UpdateIssue(issueModel);

            // act
            var commandResult = await this.CommandExecutor.ExecuteAsync(command);

            // assert
            CommandAssert.IsSuccessful(commandResult);
        }
    }
}