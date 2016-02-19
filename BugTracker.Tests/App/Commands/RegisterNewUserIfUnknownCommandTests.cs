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
    public class RegisterNewUserIfUnknownCommand : TestBase
    {
        private CommandRepository commandRepository;
        private Mock<IUserAccess> userAccessMock;

        [SetUp]
        public void Setup()
        {
            this.commandRepository = this.Resolve<CommandRepository>();
            this.userAccessMock = this.CreateMockAndRegisterInDI<IUserAccess>(MockBehavior.Strict);
        }

        [Test]
        public async void Initialize_WithNull_NotSuccessful()
        {
            // arrange
            RegisterUserModel registrationModel = null;
            var command = this.commandRepository.RegisterNewUserIfUnknown(registrationModel);

            // act
            var commandResult = await this.CommandExecutor.ExecuteAsync(command);

            // assert
            CommandAssert.IsFailure(commandResult);
        }

        [Test]
        public async void Execute_WithNullUsername_NotSuccessful()
        {
            // arrange
            RegisterUserModel registrationModel = new RegisterUserModel { Username = null };
            var command = this.commandRepository.RegisterNewUserIfUnknown(registrationModel);

            // act
            var commandResult = await this.CommandExecutor.ExecuteAsync(command);

            // assert
            CommandAssert.IsFailure(commandResult);
        }

        [Test]
        public async void Execute_WithValidModel_Successful()
        {
            // arrange
            RegisterUserModel registrationModel = new RegisterUserModel { Username = "Bob" };
            this.userAccessMock.Setup(x => x.TryGetByName(registrationModel.Username)).Returns(Maybe<User>.Empty);
            this.userAccessMock.Setup(x => x.Add(registrationModel.Username)).Returns(new User { Name = registrationModel.Username });
            var command = this.commandRepository.RegisterNewUserIfUnknown(registrationModel);

            // act
            var commandResult = await this.CommandExecutor.ExecuteAsync(command);

            // assert
            CommandAssert.IsSuccessful(commandResult);
            Assert.AreEqual(registrationModel.Username, commandResult.SuccessData.Name);
        }

        [Test]
        public async void Execute_WithValidModelAndUserIsUnknwon_Successful()
        {
            // arrange
            RegisterUserModel registrationModel = new RegisterUserModel { Username = "Bob" };
            this.userAccessMock.Setup(x => x.TryGetByName(registrationModel.Username)).Returns(Maybe<User>.Empty);
            this.userAccessMock.Setup(x => x.Add(registrationModel.Username)).Returns(new User { Name = registrationModel.Username });
            var command = this.commandRepository.RegisterNewUserIfUnknown(registrationModel);

            // act
            var commandResult = await this.CommandExecutor.ExecuteAsync(command);

            // assert
            CommandAssert.IsSuccessful(commandResult);
            Assert.AreEqual(registrationModel.Username, commandResult.SuccessData.Name);
        }

        [Test]
        public async void Execute_WithValidModelButUserIsKnwon_Successful()
        {
            // arrange
            RegisterUserModel registrationModel = new RegisterUserModel { Username = "Bob" };
            var existingUser = new User { Name = registrationModel.Username };
            this.userAccessMock.Setup(x => x.TryGetByName(registrationModel.Username)).Returns(new Maybe<User>(existingUser));
            var command = this.commandRepository.RegisterNewUserIfUnknown(registrationModel);

            // act
            var commandResult = await this.CommandExecutor.ExecuteAsync(command);

            // assert
            CommandAssert.IsSuccessful(commandResult);
            Assert.AreEqual(registrationModel.Username, commandResult.SuccessData.Name);
        }
    }
}