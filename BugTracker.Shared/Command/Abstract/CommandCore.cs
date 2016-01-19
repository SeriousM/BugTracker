using System;
using System.Threading.Tasks;

using BugTracker.Shared.Command.Entities;
using BugTracker.Shared.Extensions;

namespace BugTracker.Shared.Command.Abstract
{
    public abstract class CommandCore<T> where T : CommandResult
    {
        internal bool IsExecuted { get; set; }

        internal CanExecuteCommandResult CanExecuteCommandResult { get; set; }

        internal abstract T CreateError(Exception ex);

        internal abstract T CreateError(string errorMessage);

        protected internal virtual Task<CanExecuteCommandResult> CanExecuteAsync()
		{
			return CanExecuteCommandResult.Success.ToTaskResult();
		}

        protected internal abstract Task<T> ExecuteAsync();

        protected CanExecuteCommandResult CannotExecute(string message)
        {
            return CanExecuteCommandResult.Error(message);
        }

        protected CanExecuteCommandResult CanExecute()
        {
            return CanExecuteCommandResult.Success;
        }

        protected CommandResult ExecutionError(string message)
        {
            return CommandResult.FromError(message);
        }

        protected CommandResult ExecutionError(Exception exception)
        {
            return CommandResult.FromError(exception);
        }
    }
}