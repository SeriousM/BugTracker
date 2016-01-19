using System;
using System.Collections.Generic;
using System.Web.Http.Controllers;
using System.Web.Http.Dependencies;

using Microsoft.Practices.Unity;

namespace BugTracker.Shared.Unity
{
    public class UnityDependencyScope : IDependencyScope
    {
        protected IUnityContainer Container { get; }

        public UnityDependencyScope(IUnityContainer container)
        {
            this.Container = container;
        }

        public object GetService(Type serviceType)
        {
            if (typeof(IHttpController).IsAssignableFrom(serviceType))
            {
                return this.Container.Resolve(serviceType);
            }

            try
            {
                return this.Container.Resolve(serviceType);
            }
            catch
            {
                return null;
            }
        }

        public IEnumerable<object> GetServices(Type serviceType)
        {
            return this.Container.ResolveAll(serviceType);
        }

        public void Dispose()
        {
            this.Container.Dispose();
        }
    }
}