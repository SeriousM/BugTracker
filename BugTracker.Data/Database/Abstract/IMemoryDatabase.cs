using System;
using System.Collections.ObjectModel;

using BugTracker.Shared;

namespace BugTracker.Data.Database.Abstract
{
    public interface IMemoryDatabase
    {
        void Add<T>(Guid id, T objectToSave) where T : class;
        Maybe<T> TryGet<T>(Guid id) where T : class;
        T Get<T>(Guid id) where T : class;
        ReadOnlyDictionary<Guid, T> GetAll<T>() where T : class;
        void Remove<T>(Guid id) where T : class;
    }
}