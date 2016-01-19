using System;
using System.Text;

using BugTracker.Shared.Logging.Abstract;
using BugTracker.Shared.Logging.Entities;

namespace BugTracker.Shared.Logging
{
    public class StaticLogList : VolatileRollingList<StaticLogEntry>
    {
        /// <summary>
        /// Holds the singleton instance.
        /// </summary>
        private static readonly Lazy<StaticLogList> instance = new Lazy<StaticLogList>(() => new StaticLogList());

        /// <summary>
        /// Gets the singleton instance.
        /// </summary>
        /// <value>The singleton instance.</value>
        public static StaticLogList Instance
        {
            get
            {
                return StaticLogList.instance.Value;
            }
        }

        /// <summary>
        /// Prevents the public initialization of this class.
        /// </summary>
        private StaticLogList()
        {
        }

        public static StaticLogList CreateNewLogList()
        {
            return new StaticLogList();
        }

        public void Append(string typeName, LogLevelType level, object message, Exception excpetion = null)
        {
            if (message == null) return;

            var staticLogEntry = new StaticLogEntry { TypeName = typeName, Level = level, Message = message.ToString(), TimeStamp = DateTime.UtcNow };

            if (excpetion != null)
            {
                staticLogEntry.Exception = this.GetExceptionStack(excpetion);
            }

            base.Append(staticLogEntry);
        }

        internal string GetExceptionStack(Exception exception, int? level = null)
        {
            const int MAX_LEVEL = 15;

            if (level.HasValue && level.Value > MAX_LEVEL)
            {
                return $"================== END OF INNER EXCEPTION EXPLORATION (max {MAX_LEVEL}) ==================";
            }

            var sb = new StringBuilder();

            if (level.HasValue)
            {
                sb.AppendLine($"================== INNER EXCEPTION LEVEL: {level} ==================");
            }

            sb.AppendLine(exception.ToString());

            if (exception.InnerException != null)
            {
                sb.AppendLine(this.GetExceptionStack(exception.InnerException, level + 1 ?? 1));
            }

            return sb.ToString().Trim();
        }
    }
}