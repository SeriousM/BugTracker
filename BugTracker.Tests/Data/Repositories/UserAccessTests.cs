using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;

using BugTracker.Data.Database.Abstract;
using BugTracker.Data.Entities;
using BugTracker.Data.Repositories;

using Moq;

using NUnit.Framework;

namespace BugTracker.Tests.Data.Repositories
{
    [TestFixture]
    public class UserAccessTests : TestBase
    {
        private UserAccess userAccess;
        private Mock<IMemoryDatabase> databaseMock;

        [SetUp]
        public void Setup()
        {
            this.databaseMock = this.CreateMockAndRegisterInDI<IMemoryDatabase>(MockBehavior.Strict);
            this.userAccess = this.Resolve<UserAccess>();
        }

        [Test]
        public void TryGetByName_NameIsNull_Throws()
        {
            // arrange
            string nameToSearch = null;

            // act / assert
            Assert.Throws<ArgumentNullException>(() => this.userAccess.TryGetByName(nameToSearch));
        }

        [Test]
        public void TryGetByName_UnknownName_ReturnEmpty()
        {
            // arrange
            var users = new ReadOnlyDictionary<Guid, User>(new Dictionary<Guid, User>());
            this.databaseMock.Setup(d => d.GetAll<User>()).Returns(users);

            var nameToSearch = "Bob";

            // act
            var maybeUser = this.userAccess.TryGetByName(nameToSearch);

            // assert
            Assert.IsTrue(maybeUser.HasNoValue);
        }

        [Test]
        public void TryGetByName_KnownName_ReturnUser()
        {
            // arrange
            var user = new User { Id = Guid.NewGuid(), Name = "Bob" };
            var users = new ReadOnlyDictionary<Guid, User>(new Dictionary<Guid, User> { { user.Id, user } });
            this.databaseMock.Setup(d => d.GetAll<User>()).Returns(users);

            var nameToSearch = "Bob";

            // act
            var maybeUser = this.userAccess.TryGetByName(nameToSearch);

            // assert
            Assert.IsTrue(maybeUser.HasValue);
            Assert.AreEqual(user.Id, maybeUser.Value.Id);
        }

        [Test]
        public void TryGetByName_KnownNameExistTwice_Throws()
        {
            // arrange
            var user1 = new User { Id = Guid.NewGuid(), Name = "Bob" };
            var user2 = new User { Id = Guid.NewGuid(), Name = "boB" };
            var users = new ReadOnlyDictionary<Guid, User>(
                new Dictionary<Guid, User> { { user1.Id, user1 }, { user2.Id, user2 } });
            this.databaseMock.Setup(d => d.GetAll<User>()).Returns(users);

            var nameToSearch = "Bob";

            // act / assert
            Assert.Throws<InvalidOperationException>(() => this.userAccess.TryGetByName(nameToSearch));
        }

        [Test]
        public void Add_NameIsNull_Throws()
        {
            // arrange
            string nameToAdd = null;

            // act / assert
            Assert.Throws<ArgumentNullException>(() => this.userAccess.Add(nameToAdd));
        }

        [Test]
        public void Add_NameIsvalid_CanBeReadAfterwards()
        {
            // arrange
            string nameToAdd = "Bob";
            string savedName = null;
            this.databaseMock
                .Setup(d => d.Add(It.IsAny<Guid>(), It.Is<User>(p => p.Name.Equals(nameToAdd))))
                .Callback<Guid, User>((i, u) => savedName = u.Name);

            // act
            this.userAccess.Add(nameToAdd);

            // assert
            Assert.AreEqual(nameToAdd, savedName);
        }
    }
}