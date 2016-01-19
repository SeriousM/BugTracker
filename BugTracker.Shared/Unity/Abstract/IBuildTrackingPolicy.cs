using System.Collections.Generic;

using Microsoft.Practices.ObjectBuilder2;

namespace BugTracker.Shared.Unity.Abstract
{
    // Log4Net / Common.Logging integration with unity: http://blog.baltrinic.com/software-development/dotnet/log4net-integration-with-unity-ioc-container
    public interface IBuildTrackingPolicy : IBuilderPolicy
    {
        Stack<object> BuildKeys { get; }
    }
}