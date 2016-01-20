using System;

namespace BugTracker.Data.Entities
{
    public class Issue
    {
        public Guid Id { get; set; }
        public Guid UserId { get; set; }
        public string Title { get; set; }
        public string Content { get; set; }
        public DateTime ReportDate { get; set; }
        public bool IsClosed { get; set; }
    }
}