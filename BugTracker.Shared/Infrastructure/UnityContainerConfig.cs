using Microsoft.Practices.ServiceLocation;
using Microsoft.Practices.Unity;

namespace BugTracker.Shared.Infrastructure
{
    // unity documentation: https://msdn.microsoft.com/en-us/library/dn178470(v=pandp.30).aspx
    public static class UnityContainerConfig
    {
        public static IUnityContainer CreateAndRegisterUnityContainer()
        {
            IUnityContainer unityContainer = new UnityContainer();

            UnityServiceLocator serviceLocator = new UnityServiceLocator(unityContainer);

            ServiceLocator.SetLocatorProvider(() => serviceLocator);

            return unityContainer;
        }
    }
}