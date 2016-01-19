using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;

using BugTracker.Shared.Assertions;

namespace BugTracker.Shared.Command.Entities
{
    public class CommandResult
    {
        private readonly Dictionary<string, object> errorData = new Dictionary<string, object>();

        protected CommandResult(bool isSuccess)
        {
            this.IsSuccess = isSuccess;
        }

        public bool IsSuccess { get; private set; }

        public bool IsFailure { get { return !this.IsSuccess; } }

        public string ErrorMessage { get; protected set; }

        public Exception Exception { get; protected set; }

        public ReadOnlyDictionary<string, object> ErrorData => new ReadOnlyDictionary<string, object>(this.errorData);

        internal virtual void SetToError(string errorMessage)
        {
            this.IsSuccess = false;
            this.ErrorMessage = errorMessage;
            this.Exception = this.ToException();
        }

        internal virtual void SetToError(Exception exception)
        {
            this.IsSuccess = false;
            this.ErrorMessage = exception.Message;
            this.Exception = exception;

            this.SyncExceptionDataWithErrorData();
        }

        /// <summary>
        /// Sets or overwrites an error information on the <see cref="ErrorData"/> and on the <see cref="Exception"/>.Data.
        /// </summary>
        /// <exception cref="InvalidOperationException">If the command result represents a success state.</exception>
        public void SetErrorData(string key, object value)
        {
            if (this.IsSuccess)
            {
                throw new InvalidOperationException("The CommandResult represents a success state and can't have error data.");
            }

            Check.IsNotNull(nameof(key), key);

            this.errorData[key] = value;
            this.Exception.Data[key] = value;
        }

        private void SyncExceptionDataWithErrorData()
        {
            foreach (var exceptionDataKey in this.Exception.Data.Keys)
            {
                var exceptionDataValue = this.Exception.Data[exceptionDataKey];

                var errorDataKey = exceptionDataKey.ToString();

                this.errorData[errorDataKey] = exceptionDataValue;
            }
        }

        internal static readonly CommandResult Success = new CommandResult(true);

        internal static CommandResult FromError(Exception exception)
        {
            var commandResult = new CommandResult(false);
            commandResult.SetToError(exception);
            return commandResult;
        }

        internal static CommandResult FromError(string errorMessage)
        {
            var commandResult = new CommandResult(false);
            commandResult.SetToError(errorMessage);
            return commandResult;
        }

        private Exception ToException()
        {
            if (this.Exception != null)
            {
                return this.Exception;
            }
            var exception = new InvalidOperationException(this.ErrorMessage);

            return exception;
        }

        /// <summary>
        /// Returns a string that represents the current object.
        /// </summary>
        /// <returns>
        /// A string that represents the current object.
        /// </returns>
        public override string ToString()
        {
            return $"Successful: {this.IsSuccess}, ErrorMessage: '{this.ErrorMessage}', Exception: '{this.Exception}'";
        }
    }

    public class CommandResult<T> : CommandResult
    {
        private CommandResult(bool isSuccess, T successData = default(T))
            : base(isSuccess)
        {
            this.SuccessData = successData;
        }

        public T SuccessData { get; private set; }

        internal static CommandResult<T> FromSuccess(T result)
        {
            return new CommandResult<T>(true, result);
        }

        internal static new CommandResult<T> FromError(string message)
        {
            var commandResult = new CommandResult<T>(false);
            commandResult.SetToError(message);
            return commandResult;
        }

        internal static new CommandResult<T> FromError(Exception exception)
        {
            var commandResult = new CommandResult<T>(false);
            commandResult.SetToError(exception);
            return commandResult;
        }

        internal override void SetToError(string errorMessage)
        {
            this.SuccessData = default(T);
            base.SetToError(errorMessage);
        }

        internal override void SetToError(Exception exception)
        {
            this.SuccessData = default(T);
            base.SetToError(exception);
        }
    }
}
