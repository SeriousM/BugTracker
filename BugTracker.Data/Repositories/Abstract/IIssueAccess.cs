using System;
using System.Collections.Generic;

using BugTracker.Data.Entities;

namespace BugTracker.Data.Repositories.Abstract
{
    public interface IIssueAccess
    {
        Issue Add(Guid userId, string title, string content);
        List<Issue> GetAllByUserId(Guid userId);
    }
}