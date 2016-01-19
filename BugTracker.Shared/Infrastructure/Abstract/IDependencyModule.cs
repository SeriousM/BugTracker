using Microsoft.Practices.Unity;

namespace BugTracker.Shared.Infrastructure.Abstract
{
    public interface IDependencyModule
    {
        void Register(IUnityContainer unityContainer);
    }
}