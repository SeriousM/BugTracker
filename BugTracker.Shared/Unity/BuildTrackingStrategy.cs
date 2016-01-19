using System.Diagnostics;

using BugTracker.Shared.Unity.Abstract;

using Microsoft.Practices.ObjectBuilder2;

namespace BugTracker.Shared.Unity
{
    [DebuggerNonUserCode]
    // Log4Net / Common.Logging integration with unity: http://blog.baltrinic.com/software-development/dotnet/log4net-integration-with-unity-ioc-container
    public class BuildTrackingStrategy : BuilderStrategy
    {
        public override void PreBuildUp(IBuilderContext context)
        {
            var policy = BuildTrackingExtension.GetPolicy(context)
                         ?? BuildTrackingExtension.SetPolicy(context);

            policy.BuildKeys.Push(context.BuildKey);
        }

        public override void PostBuildUp(IBuilderContext context)
        {
            IBuildTrackingPolicy policy = BuildTrackingExtension.GetPolicy(context);
            if ((policy != null) && (policy.BuildKeys.Count > 0))
            {
                policy.BuildKeys.Pop();
            }
        }
    }
}