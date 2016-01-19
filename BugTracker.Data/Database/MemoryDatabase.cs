using System;
using System.Collections.Concurrent;
using System.Collections.ObjectModel;
using System.Linq;

using BugTracker.Data.Database.Abstract;
using BugTracker.Shared;
using BugTracker.Shared.Assertions;

namespace BugTracker.Data.Database
{
    internal class MemoryDatabase : IMemoryDatabase
    {
        private readonly ConcurrentDictionary<Type, ConcurrentDictionary<Guid, object>> typeDictionary;

        public MemoryDatabase()
        {
            this.typeDictionary = new ConcurrentDictionary<Type, ConcurrentDictionary<Guid, object>>();
        }

        public void Add<T>(Guid id, T objectToSave) where T : class
        {
            Check.IsNotNull(nameof(objectToSave), objectToSave);

            var objectToSaveType = typeof(T);
            this.Add(id, objectToSaveType, objectToSave);
        }

        private void Add(Guid id, Type objectToSaveType, object objectToSave)
        {
            var dictionary = this.GetTypeDictionary(objectToSaveType);

            if (dictionary.ContainsKey(id))
            {
                throw new InvalidOperationException($"The id {id} for type {objectToSaveType} already exist.");
            }

            bool addSuccessful = dictionary.TryAdd(id, objectToSave);

            if (!addSuccessful)
            {
                throw new MemoryDataCollectionException($"Adding the object with id {id} and type {objectToSaveType} failed.");
            }
        }

        public Maybe<T> TryGet<T>(Guid id) where T : class
        {
            var objectToSaveType = typeof(T);
            var dictionary = this.GetTypeDictionary(objectToSaveType);

            if (!dictionary.ContainsKey(id))
            {
                return null;
            }

            var returnValue = (T)dictionary[id];
            return returnValue;
        }

        public T Get<T>(Guid id) where T : class
        {
            var objectToSaveType = typeof(T);
            var maybeObject = this.TryGet<T>(id);
            if (maybeObject.HasNoValue)
            {
                throw new ArgumentException($"The id {id} for {objectToSaveType} was not found.");
            }

            var returnValue = maybeObject.Value;

            return returnValue;
        }

        public ReadOnlyDictionary<Guid, T> GetAll<T>() where T : class
        {
            var objectToSaveType = typeof(T);
            var dictionary = this.GetTypeDictionary(objectToSaveType);

            ReadOnlyDictionary<Guid, T> collection = new ReadOnlyDictionary<Guid, T>(dictionary.ToDictionary(x => x.Key, x => (T)x.Value));

            return collection;
        }

        public void Remove<T>(Guid id) where T : class
        {
            var objectToSaveType = typeof(T);
            var dictionary = this.GetTypeDictionary(objectToSaveType);

            if (!dictionary.ContainsKey(id))
            {
                throw new ArgumentException($"The id {id} for {objectToSaveType} was not found.");
            }

            object value;
            dictionary.TryRemove(id, out value);
        }

        private ConcurrentDictionary<Guid, object> GetTypeDictionary(Type type)
        {
            var dictionary = this.typeDictionary.GetOrAdd(type, key => new ConcurrentDictionary<Guid, object>());
            return dictionary;
        }
    }
}