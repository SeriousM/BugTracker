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

        public void Update(Guid issueId, string title, string content, bool isClosed)
        {
            Check.IsNotNull(nameof(title), title);
            Check.IsNotNull(nameof(content), content);

            var existingEntity = this.database.Get<Issue>(issueId);

            if (existingEntity == null)
            {
                throw new Exception($"Could not found issue with the Id {issueId}.");
            }

            existingEntity.Content = content;
            existingEntity.Title = title;
            existingEntity.IsClosed = isClosed;

            this.database.Remove<Issue>(issueId);
            this.database.Add<Issue>(issueId, existingEntity);
        }

        public List<Issue> GetAllByUserId(Guid userId)
        {
            var issues = this.database.GetAll<Issue>()
                .Where(pair => pair.Value.UserId == userId)
                .Select(pair => pair.Value).ToList();

            return issues;
        }
    }
}