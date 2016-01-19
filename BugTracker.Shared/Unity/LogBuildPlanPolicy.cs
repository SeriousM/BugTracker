using System;
using System.Diagnostics;

using log4net;

using Microsoft.Practices.ObjectBuilder2;

namespace BugTracker.Shared.Unity
{
    [DebuggerNonUserCode]
    // Log4Net / Common.Logging integration with unity: http://blog.baltrinic.com/software-development/dotnet/log4net-integration-with-unity-ioc-container
    public class LogBuildPlanPolicy : IBuildPlanPolicy
    {
        public LogBuildPlanPolicy(Type logType)
        {
            this.LogType = logType;
        }

        public Type LogType { get; }

        public void BuildUp(IBuilderContext context)
        {
            if (context.Existing == null)
            {
                ILog log = LogManager.GetLogger(this.LogType);
                context.Existing = log;
            }
        }
    }
}