using System;
using BugTracker.App.Commands.Repository;
using BugTracker.Data.Entities;
using BugTracker.Data.Repositories.Abstract;
using BugTracker.Shared;
using Moq;

using NUnit.Framework;

namespace BugTracker.Tests.App.Commands
{
    [TestFixture]
    public class GetIssueByIdCommandTests : TestBase
    {
        private CommandRepository commandRepository;
        private Mock<IIssueAccess> issueAccessMock;

        [SetUp]
        public void Setup()
        {
            this.commandRepository = this.Resolve<CommandRepository>();
            this.issueAccessMock = this.CreateMockAndRegisterInDI<IIssueAccess>(MockBehavior.Strict);
        }

        [Test]
        public async void Initialize_WithEmptyGuid_NotSuccessful()
        {
            // arrange
            Guid emptyId = Guid.Empty;
            var command = this.commandRepository.GetIssueById(emptyId);

            // act
            var commandResult = await this.CommandExecutor.ExecuteAsync(command);

            // assert
            CommandAssert.IsFailure(commandResult);
        }

        [Test]
        public async void Execute_WithCorrectModel_Successful()
        {
            var issueId = Guid.NewGuid();

            // arrange
            var issueEntity = new Issue
            {
                Id = issueId,
                UserId = Guid.NewGuid(),
                Title = "title",
                Content = "content",
                IsClosed = false
            };

            this.issueAccessMock
                .Setup(x => x.TryGet(issueId))
                .Returns(new Maybe<Issue>(issueEntity));

            var command = this.commandRepository.GetIssueById(issueId);

            // act
            var commandResult = await this.CommandExecutor.ExecuteAsync(command);

            // assert
            CommandAssert.IsSuccessful(commandResult);
            Assert.AreEqual(issueId, commandResult.SuccessData.Id);
        }

        [Test]
        public async void Execute_WithUnknownId_Failure()
        {
            var issueId = Guid.NewGuid();

            // arrange
            this.issueAccessMock
                .Setup(x => x.TryGet(issueId))
                .Returns(Maybe<Issue>.Empty);

            var command = this.commandRepository.GetIssueById(issueId);

            // act
            var commandResult = await this.CommandExecutor.ExecuteAsync(command);

            // assert
            CommandAssert.IsFailure(commandResult);
        }
    }
}