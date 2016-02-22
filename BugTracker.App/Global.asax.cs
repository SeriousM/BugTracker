using System;
using System.Web;
using System.Web.Http;
using System.Web.Http.Cors;
using BugTracker.Shared.Infrastructure;
using Newtonsoft.Json.Serialization;

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
            var cors = new EnableCorsAttribute("http://127.0.0.1:8080/", "*", "*");
            configuration.EnableCors(cors);

            var json = GlobalConfiguration.Configuration.Formatters.JsonFormatter;
            json.SerializerSettings.ContractResolver = new CamelCasePropertyNamesContractResolver();

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