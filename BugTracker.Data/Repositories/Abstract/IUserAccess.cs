using System;

using BugTracker.Data.Entities;
using BugTracker.Shared;

namespace BugTracker.Data.Repositories.Abstract
{
    public interface IUserAccess
    {
        User GetById(Guid id);
        Maybe<User> TryGetById(Guid id);
        Maybe<User> TryGetByName(string name);
        User Add(string name);
    }
}