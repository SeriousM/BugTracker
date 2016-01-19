using System;

using BugTracker.Shared.Command.Entities;

namespace BugTracker.Shared.Command.Abstract
{
	public abstract class CommandBase : CommandCore<CommandResult>
	{
		internal override CommandResult CreateError(Exception ex)
		{
			return CommandResult.FromError(ex);
		}

		internal override CommandResult CreateError(string errorMessage)
		{
			return CommandResult.FromError(errorMessage);
        }

        protected CommandResult SuccessExecution()
        {
            return CommandResult.Success;
        }
    }

	public abstract class CommandBase<T> : CommandCore<CommandResult<T>>
	{
		internal override CommandResult<T> CreateError(Exception ex)
		{
			return CommandResult<T>.FromError(ex);
		}

		internal override CommandResult<T> CreateError(string errorMessage)
		{
			return CommandResult<T>.FromError(errorMessage);
        }

        protected new CommandResult<T> ExecutionError(string message)
	    {
	        return CommandResult<T>.FromError(message);
	    }

	    protected new CommandResult<T> ExecutionError(Exception exception)
	    {
	        return CommandResult<T>.FromError(exception);
	    }

	    protected CommandResult<T> SuccessExecution(T result)
	    {
	        return CommandResult<T>.FromSuccess(result);
	    }
	}
}
