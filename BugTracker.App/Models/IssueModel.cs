using System;
using System.ComponentModel.DataAnnotations;
using BugTracker.Data.Entities;

namespace BugTracker.App.Models
{
    public class IssueModel
    {
        [Key]
        public Guid Id { get; set; }
        public Guid UserId { get; set; }
        public string Title { get; set; }
        public string Content { get; set; }
        public DateTime ReportDate { get; set; }
        public bool IsClosed { get; set; }

        public static IssueModel FromIssue(Issue issue)
        {
            var model = new IssueModel
            {
                Id = issue.Id,
                Content = issue.Content,
                IsClosed = issue.IsClosed,
                ReportDate = issue.ReportDate,
                Title = issue.Title,
                UserId = issue.UserId
            };
            return model;
        }
    }
}