using System;
using System.Threading.Tasks;

using log4net;

using Microsoft.Practices.ServiceLocation;

namespace BugTracker.Shared.Logging
{
    public static class GlobalErrorLogger
    {
        public static void RegisterErrorHandlers()
        {
            AppDomain.CurrentDomain.UnhandledException += GlobalErrorLogger.CurrentDomain_UnhandledException;
            TaskScheduler.UnobservedTaskException += GlobalErrorLogger.Tasks_UnobservedTaskException;
        }

        private static void CurrentDomain_UnhandledException(object sender, UnhandledExceptionEventArgs e)
        {
            var logger = ServiceLocator.Current.GetInstance<ILog>();

            var exception = e.ExceptionObject as Exception;
            if (exception != null)
            {
                logger.Fatal("An unhandled Exception occured.", exception);
            }
            else
            {
                logger.Fatal($"An unhandled Exception occured: {e.ExceptionObject ?? "none"}");
            }
        }

        private static void Tasks_UnobservedTaskException(object sender, UnobservedTaskExceptionEventArgs e)
        {
            e.SetObserved();

            var logger = ServiceLocator.Current.GetInstance<ILog>();

            logger.Error(
                $"An unobserved task exception occures! Sender was {(sender != null ? sender.GetType().FullName : "(not set!)")}.",
                e.Exception);
        }
    }
}