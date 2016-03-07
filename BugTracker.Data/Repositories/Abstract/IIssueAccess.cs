using System;
using System.Collections.Generic;

using BugTracker.Data.Entities;
using BugTracker.Shared;

namespace BugTracker.Data.Repositories.Abstract
{
    public interface IIssueAccess
    {
        Maybe<Issue> TryGet(Guid issueId);
        Issue Add(Guid userId, string title, string content);
        void Update(Guid issueId, string title, string content, bool isClosed);
        List<Issue> GetAllByUserId(Guid userId);
    }
}