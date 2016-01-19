using System;
using System.Web.Http;

using BugTracker.Shared.Infrastructure;

namespace BugTracker.App
{
    public class Global : System.Web.HttpApplication
    {
        protected void Application_Start(object sender, EventArgs e)
        {
            GlobalConfiguration.Configure(this.ConfigurationCallback);
        }

        private void ConfigurationCallback(HttpConfiguration configuration)
        {
            WebApiConfig.Register(configuration);
            WebBootstrapper.Instance.Start(configuration);
        }

        protected void Session_Start(object sender, EventArgs e)
        {

        }

        protected void Application_BeginRequest(object sender, EventArgs e)
        {

        }

        protected void Application_AuthenticateRequest(object sender, EventArgs e)
        {

        }

        protected void Application_Error(object sender, EventArgs e)
        {

        }

        protected void Session_End(object sender, EventArgs e)
        {

        }

        protected void Application_End(object sender, EventArgs e)
        {

        }
    }
}