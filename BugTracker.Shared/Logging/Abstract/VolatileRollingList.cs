using System.Collections.Generic;
using System.Linq;

namespace BugTracker.Shared.Logging.Abstract
{
    public abstract class VolatileRollingList<TEntity>
	{
		private volatile List<TEntity> queue = new List<TEntity>();

		protected VolatileRollingList()
		{
		    this.CallCount = 30;
		    this.MaxEntries = 150;
		}

		public int CallCount { get; protected set; }
		public int MaxEntries { get; protected set; }

		protected void Append(TEntity entity)
		{
			lock (this.queue)
			{
			    this.queue.Add(entity);

				if (this.CallCount++ > 30)
				{
				    this.CallCount = 0;
				    this.TrimList();
				}
			}
		}

		private void TrimList()
		{
			var toRemove = this.queue.Count - this.MaxEntries;

			if (toRemove <= 0) return;

		    this.queue.Take(toRemove).ToList().ForEach(x => this.queue.Remove(x));
		    this.queue.TrimExcess();
		}

		public void ClearList()
		{
		    this.queue.Clear();
		}

		public List<TEntity> GetLogs()
		{
			return new List<TEntity>(this.queue);
		}
	}
}