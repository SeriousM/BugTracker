using System;
using System.Linq;

using BugTracker.Shared.Infrastructure.Abstract;

using log4net;

using Microsoft.Practices.Unity;

namespace BugTracker.Shared.Infrastructure
{
    public static class DependencyModuleResolver
    {
        public static void RegisterDependencyModulesFromLoadedAssemblies(IUnityContainer unityContainer)
        {
            var dependencyModuleTypes = AppDomain.CurrentDomain
                .GetAssemblies()
                .Where(x => !x.IsDynamic && x.FullName.StartsWith(Constants.Namespaces.BugTrackerPrefix, StringComparison.InvariantCultureIgnoreCase))
                .SelectMany(x => x.GetExportedTypes().Where(t => t.GetInterfaces().Contains(typeof(IDependencyModule))))
                .ToList();

            string currentDependencyModuleTypeName = null;
            try
            {
                foreach (Type dependencyModuleType in dependencyModuleTypes)
                {
                    currentDependencyModuleTypeName = dependencyModuleType.FullName;

                    var dependencyModule = Activator.CreateInstance(dependencyModuleType) as IDependencyModule;
                    dependencyModule?.Register(unityContainer);
                }
            }
            catch (Exception ex)
            {
                LogManager.GetLogger(typeof(WebBootstrapper)).Fatal($"Registration of dependency module '{currentDependencyModuleTypeName}' failed!", ex);

                // exit here to break the bootup
                throw;
            }
        }
    }
}