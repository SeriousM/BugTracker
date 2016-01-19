using BugTracker.Data.Database;
using BugTracker.Data.Database.Abstract;
using BugTracker.Shared.Infrastructure.Abstract;

using Microsoft.Practices.Unity;

namespace BugTracker.Data.DependencyModules
{
    public class DatabaseDependencyModule : IDependencyModule
    {
        public void Register(IUnityContainer unityContainer)
        {
            unityContainer.RegisterType<IMemoryDatabase, MemoryDatabase>(new ContainerControlledLifetimeManager());
        }
    }
}