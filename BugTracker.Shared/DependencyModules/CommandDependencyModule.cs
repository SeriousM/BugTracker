using BugTracker.Shared.Command.Utils;
using BugTracker.Shared.Command.Utils.Abstract;
using BugTracker.Shared.Infrastructure.Abstract;

using Microsoft.Practices.Unity;

namespace BugTracker.Shared.DependencyModules
{
    public class CommandDependencyModule : IDependencyModule
    {
        public void Register(IUnityContainer unityContainer)
        {
            unityContainer.RegisterType<ICommandFactory, CommandFactory>(new ContainerControlledLifetimeManager());
            unityContainer.RegisterType<ICommandExecutor, CommandExecutor>(new ContainerControlledLifetimeManager());
        }
    }
}