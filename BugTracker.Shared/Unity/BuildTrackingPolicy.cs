using System.Collections.Generic;
using System.Diagnostics;

using BugTracker.Shared.Unity.Abstract;

namespace BugTracker.Shared.Unity
{
    [DebuggerNonUserCode]
    // Log4Net / Common.Logging integration with unity: http://blog.baltrinic.com/software-development/dotnet/log4net-integration-with-unity-ioc-container
    public class BuildTrackingPolicy : IBuildTrackingPolicy
    {
        public BuildTrackingPolicy()
        {
            this.BuildKeys = new Stack<object>();
        }

        public Stack<object> BuildKeys { get; }
    }
}