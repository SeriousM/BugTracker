using System;

using BugTracker.Data.Database;

using NUnit.Framework;

namespace BugTracker.Tests.Data.Database
{
    [TestFixture]
    public class MemoryDataCollectionTests : TestBase
    {
        private MemoryDatabase database;

        [SetUp]
        public void Setup()
        {
            this.database = new MemoryDatabase();
        }

        [Test]
        public void Add_ObjectIsNull_Throws()
        {
            // arrange
            object objectToSave = null;
            Guid id = Guid.NewGuid();

            // act / assert
            Assert.Throws<ArgumentNullException>(() => this.database.Add(id, objectToSave));
        }

        [Test]
        public void Add_ObjectIsValid_Ok()
        {
            // arrange
            object objectToSave = new object();
            Guid id = Guid.NewGuid();

            // act / assert
            Assert.DoesNotThrow(() => this.database.Add(id, objectToSave));
        }

        [Test]
        public void Add_TwoObjectWithSameId_Throws()
        {
            // arrange
            var objectToSave1 = new object();
            var objectToSave2 = new object();
            Guid id = Guid.NewGuid();

            this.database.Add(id, objectToSave1);

            // act / assert
            Assert.Throws<InvalidOperationException>(() => this.database.Add(id, objectToSave2));
        }

        [Test]
        public void Add_TwoDifferentObjectTypesWithSameId_Ok()
        {
            // arrange
            var objectToSave1 = new TestA();
            var objectToSave2 = new TestB();
            Guid id = Guid.NewGuid();

            this.database.Add(id, objectToSave1);

            // act / assert
            Assert.DoesNotThrow(() => this.database.Add(id, objectToSave2));
        }

        [Test]
        public void Get_UnknownId_Throws()
        {
            // arrange
            var id = Guid.Empty;

            // act / assert
            Assert.Throws<ArgumentException>(() => this.database.Get<object>(id));
        }

        [Test]
        public void Get_KnownId_ReturnsObject()
        {
            // arrange
            object objectToSave = new object();
            var id = Guid.Empty;
            this.database.Add(id, objectToSave);

            // act
            var returnValue = this.database.Get<object>(id);

            // assert
            Assert.IsNotNull(returnValue);
        }

        [Test]
        public void GetAll_EmptyCollection_ReturnsEmpty()
        {
            // arrange

            // act
            var returnValue = this.database.GetAll<object>();

            // assert
            Assert.IsNotNull(returnValue);
            Assert.IsEmpty(returnValue);
        }

        [Test]
        public void GetAll_FilledCollection_ReturnsExactCollection()
        {
            // arrange
            this.database.Add(Guid.NewGuid(), new object());
            this.database.Add(Guid.NewGuid(), new object());
            this.database.Add(Guid.NewGuid(), new object());
            this.database.Add(Guid.NewGuid(), new object());

            // act
            var returnValue = this.database.GetAll<object>();

            // assert
            Assert.IsNotNull(returnValue);
            Assert.IsNotEmpty(returnValue);
            Assert.AreEqual(4, returnValue.Count);
        }

        [Test]
        public void Remove_UnknownId_Throws()
        {
            // arrange
            var id = Guid.Empty;

            // act / assert
            Assert.Throws<ArgumentException>(() => this.database.Remove<object>(id));
        }

        [Test]
        public void Remove_KnownId_ReturnsObject()
        {
            // arrange
            object objectToSave = new object();
            var id = Guid.Empty;
            this.database.Add(id, objectToSave);

            // act / assert
            Assert.DoesNotThrow(() => this.database.Remove<object>(id));
        }

        private class TestA { }
        private class TestB { }
    }
}