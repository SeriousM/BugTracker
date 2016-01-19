using System.Web.Http;

using BugTracker.Shared.Infrastructure;

namespace BugTracker.App
{
    public class WebApiApplication : System.Web.HttpApplication
    {
        protected void Application_Start()
        {
            GlobalConfiguration.Configure(this.ConfigurationCallback);
        }

        private void ConfigurationCallback(HttpConfiguration configuration)
        {
            WebApiConfig.Register(configuration);
            WebBootstrapper.Instance.Start(configuration);
        }
    }
}
