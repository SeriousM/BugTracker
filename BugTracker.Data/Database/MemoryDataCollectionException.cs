using System;

namespace BugTracker.Data.Database
{
    public class MemoryDataCollectionException : Exception
    {
        public MemoryDataCollectionException(string message) : base(message)
        {
        }
    }
}