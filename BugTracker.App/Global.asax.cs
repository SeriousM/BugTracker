using System.Web.Http;

using BugTracker.Shared.Infrastructure;

namespace BugTracker.App
{
    public class WebApiApplication : System.Web.HttpApplication
    {
        protected void Application_Start()
        {
            GlobalConfiguration.Configure(WebApiConfig.Register);
            WebBootstrapper.Instance.Start();
        }
    }
}
