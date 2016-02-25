using System;
using System.Collections.Generic;
using System.Linq;

using BugTracker.Data.Database.Abstract;
using BugTracker.Data.Entities;
using BugTracker.Data.Repositories.Abstract;
using BugTracker.Shared.Assertions;

namespace BugTracker.Data.Repositories
{
    internal class IssueAccess : IIssueAccess
    {
        private readonly IMemoryDatabase database;

        public IssueAccess(IMemoryDatabase database)
        {
            this.database = database;

            this.CreateSampleIssues();
        }

        public Issue Add(Guid userId, string title, string content)
        {
            Check.IsNotNull(nameof(title), title);
            Check.IsNotNull(nameof(content), content);

            var issueId = Guid.NewGuid();
            var issue = new Issue
                        {
                            Id = issueId,
                            UserId = userId,
                            Title = title,
                            Content = content,
                            IsClosed = false,
                            ReportDate = DateTime.UtcNow
                        };
            this.database.Add(issueId, issue);
            return issue;
        }

        public List<Issue> GetAllByUserId(Guid userId)
        {
            var issues = this.database.GetAll<Issue>()
                .Where(pair => pair.Value.UserId == userId)
                .Select(pair => pair.Value).ToList();

            return issues;
        }

        private void CreateSampleIssues()
        {
            this.Add(new Guid("a64a7395-0a29-4847-837d-10bc291df6c8"), "Sample1", "This is the sample issue1");
            this.Add(new Guid("a64a7395-0a29-4847-837d-10bc291df6c8"), "Sample2", "This is the sample issue2");
            this.Add(new Guid("a64a7395-0a29-4847-837d-10bc291df6c8"), "Sample3", "This is the sample issue3");
        }
    }
}