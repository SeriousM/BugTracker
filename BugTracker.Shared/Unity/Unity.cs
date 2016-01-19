using System.Web.Http.Dependencies;

using Microsoft.Practices.Unity;

namespace BugTracker.Shared.Unity
{
   public class UnityDependencyResolver : UnityDependencyScope, IDependencyResolver
    {
        public UnityDependencyResolver(IUnityContainer container)
          : base(container)
        {
        }

        public IDependencyScope BeginScope()
        {
            return new UnityDependencyScope(this.Container.CreateChildContainer());
        }
    }
}