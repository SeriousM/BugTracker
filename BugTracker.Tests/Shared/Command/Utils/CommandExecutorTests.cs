using System.Threading.Tasks;

using BugTracker.Shared.Command.Abstract;
using BugTracker.Shared.Command.Entities;
using BugTracker.Shared.Extensions;

using NUnit.Framework;

namespace BugTracker.Tests.Shared.Command.Utils
{
    [TestFixture]
    public class CommandExecutorTests : TestBase
    {
        [Test]
        public async void Execute_ExecuteSuccessfulCommand_Successful()
        {
            // arrange
            var command = new TestCommand(canExecute: true, executeResultSuccessful: true);

            // act
            var commandResult = await this.CommandExecutor.ExecuteAsync(command);

            // assert
            Assert.IsTrue(commandResult.IsSuccess);
        }

        [Test]
        public async void Execute_ExecuteSuccessfulCommandTwice_Failure()
        {
            // arrange
            var command = new TestCommand(canExecute: true, executeResultSuccessful: true);
            await this.CommandExecutor.ExecuteAsync(command);

            // act
            var commandResult = await this.CommandExecutor.ExecuteAsync(command);

            // assert
            Assert.IsFalse(commandResult.IsSuccess);
        }

        [Test]
        public async void Execute_ExecuteCanExecuteFalseCommand_Failure()
        {
            // arrange
            var command = new TestCommand(canExecute: false, executeResultSuccessful: true);

            // act
            var commandResult = await this.CommandExecutor.ExecuteAsync(command);

            // assert
            Assert.IsFalse(commandResult.IsSuccess);
        }

        [Test]
        public async void Execute_ExecuteFailingCommand_Failure()
        {
            // arrange
            var command = new TestCommand(canExecute: true, executeResultSuccessful: false);

            // act
            var commandResult = await this.CommandExecutor.ExecuteAsync(command);

            // assert
            Assert.IsFalse(commandResult.IsSuccess);
        }

        private class TestCommand : CommandBase
        {
            private readonly bool canExecute;
            private readonly bool executeResultSuccessful;

            public TestCommand(bool canExecute, bool executeResultSuccessful)
            {
                this.canExecute = canExecute;
                this.executeResultSuccessful = executeResultSuccessful;
            }

            protected internal override Task<CanExecuteCommandResult> CanExecuteAsync()
            {
                if (this.canExecute)
                {
                    return CanExecuteCommandResult.Success.ToTaskResult();
                }
                return CanExecuteCommandResult.Error("Can execute blocked as intended.").ToTaskResult();
            }

            protected internal override Task<CommandResult> ExecuteAsync()
            {
                if (this.executeResultSuccessful)
                {
                    return CommandResult.Success.ToTaskResult();
                }
                return CommandResult.FromError("Execute blocked as intended.").ToTaskResult();
            }
        }
    }
}