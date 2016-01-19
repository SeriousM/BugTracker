using System;
using System.Web.Http;

using BugTracker.Shared.Extensions;
using BugTracker.Shared.Logging;
using BugTracker.Shared.Unity;

using log4net;

using Microsoft.Practices.Unity;

namespace BugTracker.Shared.Infrastructure
{
    public class WebBootstrapper
    {
        private WebBootstrapper() { }

        private static readonly Lazy<WebBootstrapper> instance = new Lazy<WebBootstrapper>(() => new WebBootstrapper());
        private bool initialized;

        public static WebBootstrapper Instance => WebBootstrapper.instance.Value;

        public void Start()
        {
            lock (this)
            {
                if (this.initialized)
                {
                    throw new InvalidOperationException("The WebBootstrapper can't be initialized more than once.");
                }

                log4net.Config.XmlConfigurator.Configure();

                IUnityContainer unityContainer = UnityContainerConfig.CreateAndRegisterUnityContainer();
                DependencyModuleResolver.RegisterDependencyModulesFromLoadedAssemblies(unityContainer);

                var logger = unityContainer.Resolve<ILog>();
                logger.Debug($"{AppDomain.CurrentDomain.BaseDirectory}: {unityContainer.GetMappingAsString()}");

                GlobalErrorLogger.RegisterErrorHandlers();

                var unityDependencyResolver = new UnityDependencyResolver(unityContainer);
                GlobalConfiguration.Configuration.DependencyResolver = unityDependencyResolver;

                this.initialized = true;
            }
        }
    }
}