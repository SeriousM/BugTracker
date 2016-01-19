using log4net.Appender;
using log4net.Core;

namespace BugTracker.Shared.Logging
{
    public class RollingMemoryAppender : AppenderSkeleton
    {
        /// <summary>
        /// Subclasses of <see cref="T:log4net.Appender.AppenderSkeleton"/> should implement this method 
        ///             to perform actual logging.
        /// </summary>
        /// <param name="loggingEvent">The event to append.</param>
        /// <remarks>
        /// <para>
        /// A subclass must implement this method to perform
        ///             logging of the <paramref name="loggingEvent"/>.
        /// </para>
        /// <para>
        /// This method will be called by <see cref="M:DoAppend(LoggingEvent)"/>
        ///             if all the conditions listed for that method are met.
        /// </para>
        /// <para>
        /// To restrict the logging of events in the appender
        ///             override the <see cref="M:PreAppendCheck()"/> method.
        /// </para>
        /// </remarks>
        protected override void Append(LoggingEvent loggingEvent)
        {
            StaticLogList.Instance.Append(loggingEvent.LoggerName, this.ConvertLog4NetLevel(loggingEvent.Level), loggingEvent.MessageObject, loggingEvent.ExceptionObject);
        }

        private LogLevelType ConvertLog4NetLevel(Level level)
        {
            if (level == Level.Info || level == Level.Notice || level == Level.Trace)
            {
                return LogLevelType.Info;
            }
            if (level == Level.Warn)
            {
                return LogLevelType.Warining;
            }
            if (level == Level.Fatal || level == Level.Alert || level == Level.Critical || level == Level.Emergency || level == Level.Severe)
            {
                return LogLevelType.Fatal;
            }
            if (level == Level.Error)
            {
                return LogLevelType.Error;
            }

            // level == Level.Debug || level == Level.Fine || level == Level.Finer || level == Level.Finest || level == Level.Verbose
            return LogLevelType.Debug;
        }
    }
}