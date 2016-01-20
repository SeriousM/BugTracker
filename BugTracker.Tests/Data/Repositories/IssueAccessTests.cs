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
    public class IssueAccessTests : TestBase
    {
        private IssueAccess issueAccess;
        private Mock<IMemoryDatabase> databaseMock;

        [SetUp]
        public void Setup()
        {
            this.databaseMock = this.CreateMockAndRegisterInDI<IMemoryDatabase>(MockBehavior.Strict);
            this.issueAccess = this.Resolve<IssueAccess>();
        }

        [Test]
        public void GetAllByUserId_UnknownUserId_ReturnsEmptyList()
        {
            // arrange
            var userId = Guid.NewGuid();
            var issues = new ReadOnlyDictionary<Guid, Issue>(new Dictionary<Guid, Issue>());
            this.databaseMock.Setup(x => x.GetAll<Issue>()).Returns(issues);

            // act
            var allIssuesForUser = this.issueAccess.GetAllByUserId(userId);

            // assert
            Assert.IsNotNull(allIssuesForUser);
            Assert.IsEmpty(allIssuesForUser);
        }

        [Test]
        public void GetAllByUserId_KnownUserId_ReturnsFilledList()
        {
            // arrange
            var userId = Guid.NewGuid();
            var issue = new Issue { Id = Guid.NewGuid(), UserId = userId };
            var issues = new ReadOnlyDictionary<Guid, Issue>(new Dictionary<Guid, Issue>
                                                           {
                                                               { issue.Id, issue }
                                                           });
            this.databaseMock.Setup(x => x.GetAll<Issue>()).Returns(issues);

            // act
            var allIssuesForUser = this.issueAccess.GetAllByUserId(userId);

            // assert
            Assert.IsNotNull(allIssuesForUser);
            Assert.IsNotEmpty(allIssuesForUser);
        }

        [Test]
        public void Add_TitleIsNull_Throws()
        {
            // arrange
            var userId = Guid.NewGuid();
            string title = null;
            string content = "content";

            // act / assert
            Assert.Throws<ArgumentNullException>(() => this.issueAccess.Add(userId, title, content));
        }

        [Test]
        public void Add_ContentIsNull_Throws()
        {
            // arrange
            var userId = Guid.NewGuid();
            string title = "title";
            string content = null;

            // act / assert
            Assert.Throws<ArgumentNullException>(() => this.issueAccess.Add(userId, title, content));
        }

        [Test]
        public void Add_ValidParameters_CanBeReadAfterwards()
        {
            // arrange
            var userId = Guid.NewGuid();
            string title = "title";
            string content = "content";

            Guid? savedUserId = null;
            string savedTitle = null;
            string savedContent = null;

            this.databaseMock
                .Setup(d => d.Add(It.IsAny<Guid>(), It.Is<Issue>(p => p.UserId.Equals(userId) && p.Title.Equals(title) && p.Content.Equals(content))))
                .Callback<Guid, Issue>((i, p) =>
                                       {
                                           savedUserId = p.UserId;
                                           savedTitle = p.Title;
                                           savedContent = p.Content;
                                       });

            // act
            this.issueAccess.Add(userId, title, content);

            // assert
            Assert.IsTrue(savedUserId.HasValue);
            Assert.AreEqual(userId, savedUserId.Value);
            Assert.AreEqual(title, savedTitle);
            Assert.AreEqual(content, savedContent);
        }
    }
}