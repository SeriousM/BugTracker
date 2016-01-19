using System;

namespace BugTracker.Shared.Logging.Entities
{
	public class StaticLogEntry
	{
		public DateTime TimeStamp { get; set; }

		public LogLevelType Level { get; set; }

		public string LevelName { get {return this.Level.ToString().ToLower();} }

		public string Message { get; set; }

		public string Exception { get; set; }

		public string TypeName { get; set; }
	}
}