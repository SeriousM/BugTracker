using BugTracker.App.Commands.Repository;
using BugTracker.Shared.Infrastructure.Abstract;

using Microsoft.Practices.Unity;

namespace BugTracker.App.DependencyModules
{
    public class CommandDependencyModule : IDependencyModule
    {
        public void Register(IUnityContainer unityContainer)
        {
            unityContainer.RegisterType<CommandRepository, CommandRepository>(new ContainerControlledLifetimeManager());
        }
    }
}