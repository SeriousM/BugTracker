using System;
using BugTracker.Data.Database.Abstract;
using BugTracker.Data.Entities;
using BugTracker.Data.Repositories.Abstract;

namespace BugTracker.App
{
    public class SampleData
    {
        private readonly IMemoryDatabase database;
        private readonly IUserAccess userAccess;
        private readonly IIssueAccess issueAccess;

        public SampleData(IMemoryDatabase database, IUserAccess userAccess, IIssueAccess issueAccess)
        {
            this.database = database;
            this.userAccess = userAccess;
            this.issueAccess = issueAccess;
        }

        public void Seed()
        {
            var userId = new Guid("a64a7395-0a29-4847-837d-10bc291df6c8");
            var user = new User { Name = "bob", Id = userId };
            this.database.Add(userId, user);

            this.issueAccess.Add(userId, "Sample1", "This is the sample issue1");
            this.issueAccess.Add(userId, "Sample2", "This is the sample issue2");
            this.issueAccess.Add(userId, "Sample3", "This is the sample issue3");
        }
    }
}