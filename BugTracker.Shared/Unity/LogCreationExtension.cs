using System.Diagnostics;

using Microsoft.Practices.Unity;
using Microsoft.Practices.Unity.ObjectBuilder;

namespace BugTracker.Shared.Unity
{
    [DebuggerNonUserCode]
    // Log4Net / Common.Logging integration with unity: http://blog.baltrinic.com/software-development/dotnet/log4net-integration-with-unity-ioc-container
    public class LogCreationExtension : UnityContainerExtension
    {
        protected override void Initialize()
        {
            this.Context.Strategies.AddNew<LogCreationStrategy>(UnityBuildStage.PreCreation);
        }
    }
}