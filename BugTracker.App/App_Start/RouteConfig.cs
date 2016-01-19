using System.Web.Http;

namespace BugTracker.App
{
    public static class RouteConfig
    {
        public static void Register(HttpConfiguration config)
        {
            config.Routes.MapHttpRoute(
                name: "Default",
                routeTemplate: "{controller}/{action}"
            );

            config.Routes.IgnoreRoute("Static", "Static/*");
        }
    }
}
