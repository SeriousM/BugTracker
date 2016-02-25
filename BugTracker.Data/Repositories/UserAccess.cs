using System;
using System.Linq;

using BugTracker.Data.Database.Abstract;
using BugTracker.Data.Entities;
using BugTracker.Data.Repositories.Abstract;
using BugTracker.Shared;
using BugTracker.Shared.Assertions;

namespace BugTracker.Data.Repositories
{
    internal class UserAccess : IUserAccess
    {
        private readonly IMemoryDatabase database;

        public UserAccess(IMemoryDatabase database)
        {
            this.database = database;

            this.CreateSampleUser();
        }

        public User GetById(Guid id)
        {
            var user = this.database.Get<User>(id);
            return user;
        }

        public Maybe<User> TryGetById(Guid id)
        {
            var maybeUser = this.database.TryGet<User>(id);
            return maybeUser;
        }

        public Maybe<User> TryGetByName(string name)
        {
            Check.IsNotNull(nameof(name), name);

            var users = this.database.GetAll<User>().Values;
            var foundUsers = users.Where(x => x.Name.Equals(name, StringComparison.InvariantCultureIgnoreCase)).ToList();

            if (foundUsers.Count > 1)
            {
                throw new InvalidOperationException($"The user with name {name} exists {foundUsers.Count} but should exist at most once.");
            }

            return foundUsers.FirstOrDefault();
        }

        public User Add(string name)
        {
            Check.IsNotNull(nameof(name), name);

            var id = Guid.NewGuid();
            var user = new User { Name = name, Id = id };

            this.database.Add(id, user);

            return user;
        }

        private void CreateSampleUser()
        {
            var id = new Guid("a64a7395-0a29-4847-837d-10bc291df6c8");
            var user = new User { Name = "bob", Id = id };
            this.database.Add(id, user);
        }
    }
}