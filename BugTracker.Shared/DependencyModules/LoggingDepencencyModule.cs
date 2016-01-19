using BugTracker.Shared.Unity;

using log4net;

using Microsoft.Practices.Unity;

namespace BugTracker.Shared.DependencyModules
{
    public class LoggingDepencencyModule
    {
        public void Register(IUnityContainer unityContainer)
        {
            // this tracks the build-order for each resolve call
            unityContainer.AddNewExtension<BuildTrackingExtension>();
            // this creates the logger instance, depending on the resolve-callee over the BuildTracking
            unityContainer.AddNewExtension<LogCreationExtension>();

            // register the ILog type
            unityContainer.RegisterType<ILog>(new TransientLifetimeManager());
        }
    }
}