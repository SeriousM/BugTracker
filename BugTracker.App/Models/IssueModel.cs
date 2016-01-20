using System;

namespace BugTracker.App.Models
{
    public class IssueModel
    {
        public Guid UserId { get; set; }
        public string Title { get; set; }
        public string Content { get; set; }
    }
}