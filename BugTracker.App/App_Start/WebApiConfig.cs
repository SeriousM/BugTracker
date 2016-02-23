using System.Web.Http;

namespace BugTracker.App
{
    public static class WebApiConfig
    {
        public static void Register(HttpConfiguration config)
        {
            config.MapHttpAttributeRoutes();

            config.Routes.IgnoreRoute(
                routeName: "Static",
                routeTemplate: "static/*"
            );
        }
    }
}
