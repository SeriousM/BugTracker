using System;
using System.Diagnostics;
using System.Linq;

using BugTracker.Shared.Unity.Abstract;

using log4net;

using Microsoft.Practices.ObjectBuilder2;

namespace BugTracker.Shared.Unity
{
    [DebuggerNonUserCode]
    // Log4Net / Common.Logging integration with unity: http://blog.baltrinic.com/software-development/dotnet/log4net-integration-with-unity-ioc-container
    public class LogCreationStrategy : BuilderStrategy
    {
        public bool IsPolicySet { get; private set; }

        public override void PreBuildUp(IBuilderContext context)
        {
            Type typeToBuild = context.BuildKey.Type;
            if (typeof(ILog) == typeToBuild)
            {

                if (context.Policies.Get<IBuildPlanPolicy>(context.BuildKey) == null)
                {
                    Type typeForLog = LogCreationStrategy.GetLogType(context);
                    IBuildPlanPolicy policy = new LogBuildPlanPolicy(typeForLog);
                    context.Policies.Set(policy, context.BuildKey);

                    this.IsPolicySet = true;
                }
            }
        }

        public override void PostBuildUp(IBuilderContext context)
        {
            if (this.IsPolicySet)
            {
                context.Policies.Clear<IBuildPlanPolicy>(context.BuildKey);
                this.IsPolicySet = false;
            }
        }

        private static Type GetLogType(IBuilderContext context)
        {
            Type logType = null;
            IBuildTrackingPolicy buildTrackingPolicy = BuildTrackingExtension.GetPolicy(context);
            if ((buildTrackingPolicy != null) && (buildTrackingPolicy.BuildKeys.Count >= 2))
            {
                logType = ((NamedTypeBuildKey)buildTrackingPolicy.BuildKeys.ElementAt(1)).Type;
            }
            else
            {
                StackTrace stackTrace = new StackTrace();
                //first two are in the log creation strategy, can skip over them
                for (int i = 2; i < stackTrace.FrameCount; i++)
                {
                    StackFrame frame = stackTrace.GetFrame(i);
                    logType = frame.GetMethod().DeclaringType;
                    if (logType != null && !logType.FullName.StartsWith("Microsoft.Practices", StringComparison.Ordinal))
                    {
                        break;
                    }
                }
            }
            return logType;
        }
    }
}