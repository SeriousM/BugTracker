using BugTracker.Data.Repositories;
using BugTracker.Data.Repositories.Abstract;
using BugTracker.Shared.Infrastructure.Abstract;

using Microsoft.Practices.Unity;

namespace BugTracker.Data.DependencyModules
{
    public class DataAccessDependencyModule : IDependencyModule
    {
        public void Register(IUnityContainer unityContainer)
        {
            unityContainer.RegisterType<IUserAccess, UserAccess>(new ContainerControlledLifetimeManager());
        }
    }
}