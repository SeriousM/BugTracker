using System;
using System.ComponentModel.DataAnnotations;

namespace BugTracker.App.Models
{
    public class IssueModel
    {
        [Key]
        public Guid Id { get; set; }
        public Guid UserId { get; set; }
        public string Title { get; set; }
        public string Content { get; set; }
    }
}