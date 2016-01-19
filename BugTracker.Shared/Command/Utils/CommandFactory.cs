using System;

using BugTracker.Shared.Command.Abstract;
using BugTracker.Shared.Command.Utils.Abstract;

using log4net;

using Microsoft.Practices.Unity;

namespace BugTracker.Shared.Command.Utils
{
    internal class CommandFactory : ICommandFactory
    {
        private readonly ILog logger;
        private readonly IUnityContainer unityContainer;

        public CommandFactory(ILog logger, IUnityContainer unityContainer)
        {
            this.logger = logger;
            this.unityContainer = unityContainer;
        }

        public TCommand CreateCommand<TCommand, TResult>() where TCommand : CommandBase<TResult>
        {
            try
            {
                TCommand command = this.unityContainer.Resolve<TCommand>();
                return command;
            }
            catch (Exception ex)
            {
                this.logger.Fatal($"Error while creating the command {typeof(TCommand).Name}.", ex);
                throw;
            }
        }

        public TCommand CreateCommand<TCommand>() where TCommand : CommandBase
        {
            try
            {
                TCommand command = this.unityContainer.Resolve<TCommand>();
                return command;
            }
            catch (Exception ex)
            {
                this.logger.Fatal($"Error while creating the command {typeof(TCommand).Name}.", ex);
                throw;
            }
        }
    }
}