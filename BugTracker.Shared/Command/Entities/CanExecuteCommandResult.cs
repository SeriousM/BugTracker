using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;

using BugTracker.Shared.Assertions;

namespace BugTracker.Shared.Command.Entities
{
	public class CanExecuteCommandResult
	{
        private readonly Dictionary<string, object> errorData = new Dictionary<string, object>();

	    public bool CanExecute { get; private set; }

	    public string Reason { get; private set; }

	    public ReadOnlyDictionary<string, object> ErrorData => new ReadOnlyDictionary<string, object>(this.errorData);

	    public static readonly CanExecuteCommandResult Success = new CanExecuteCommandResult(true);

	    private CanExecuteCommandResult(bool canExecute, string reason = null)
	    {
	        this.CanExecute = canExecute;
	        this.Reason = reason;
	    }

	    public static CanExecuteCommandResult Error(string error)
		{
			return new CanExecuteCommandResult(false, error);
        }

        /// <summary>
        /// Sets or overwrites an error information on the <see cref="ErrorData"/>.
        /// </summary>
        /// <exception cref="InvalidOperationException">If the can execute command result represents a success state.</exception>
        public void SetErrorData(string key, object value)
        {
            if (this.CanExecute)
            {
                throw new InvalidOperationException("The CanExecuteCommandResult represents a success state and can't have error data.");
            }

            Check.IsNotNull(nameof(key), key);

            this.errorData[key] = value;
        }
    }
}