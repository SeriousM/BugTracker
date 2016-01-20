using BugTracker.App.Commands.Repository;
using BugTracker.App.Commands.Repository.Abstract;
using BugTracker.Shared.Infrastructure.Abstract;

using Microsoft.Practices.Unity;

namespace BugTracker.App.DependencyModules
{
    public class CommandDependencyModule : IDependencyModule
    {
        public void Register(IUnityContainer unityContainer)
        {
            unityContainer.RegisterType<ICommandRepository, CommandRepository>(new ContainerControlledLifetimeManager());
        }
    }
}