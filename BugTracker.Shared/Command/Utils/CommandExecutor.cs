using System;
using System.Diagnostics;
using System.Threading.Tasks;

using BugTracker.Shared.Assertions;
using BugTracker.Shared.Command.Abstract;
using BugTracker.Shared.Command.Entities;
using BugTracker.Shared.Command.Utils.Abstract;

using JetBrains.Annotations;

using log4net;

namespace BugTracker.Shared.Command.Utils
{
    [DebuggerNonUserCode]
    internal class CommandExecutor : ICommandExecutor
    {
        private readonly ILog logger;

        public CommandExecutor(ILog logger)
        {
            this.logger = logger;
        }

        public async Task<TResult> ExecuteAsync<TResult>(
            [NotNull] CommandCore<TResult> command) where TResult : CommandResult
        {
            Check.IsNotNull(nameof(command), command);

            string commandTypeName = command.GetType().Name;

            // check if command can be executed
            if (command.CanExecuteCommandResult == null)
            {
                try
                {
                    command.CanExecuteCommandResult = await command.CanExecuteAsync();

                }
                catch (Exception ex)
                {
                    this.logger.Error($"The command {commandTypeName} throwed an exception while evaluating if it can execute.", ex);
                    return command.CreateError(ex);
                }
            }

            if (!command.CanExecuteCommandResult.CanExecute)
            {
                this.logger.Info($"The command {commandTypeName} cannot be executed because: {command.CanExecuteCommandResult.Reason}");
                var cannotExecuteCommandResult = command.CreateError(command.CanExecuteCommandResult.Reason);
                foreach (var error in command.CanExecuteCommandResult.ErrorData)
                {
                    cannotExecuteCommandResult.SetErrorData(error.Key, error.Value);
                }
                return cannotExecuteCommandResult;
            }

            // execute the command
            if (command.IsExecuted)
            {
                this.logger.Error($"The command {commandTypeName} was already executed and cannot be executed again.");
                return command.CreateError("The command was already executed and cannot be executed again.");
            }

            TResult commandResult;
            try
            {
                command.IsExecuted = true;
                commandResult = await command.ExecuteAsync();
            }
            catch (Exception ex)
            {
                this.logger.Error($"The command {commandTypeName} execution failed with exception.", ex);
                return command.CreateError(ex);
            }

            if (commandResult == null)
            {
                this.logger.Fatal($"The execution of the command {commandTypeName} emmits no result.");
                return command.CreateError($"The commandTypeName result of command {commandTypeName} was null.");
            }

            if (!commandResult.IsSuccess)
            {
                this.logger.Error($"The command {commandTypeName} failed to execute with this error.", commandResult.Exception);
            }

            return commandResult;
        }
    }
}
