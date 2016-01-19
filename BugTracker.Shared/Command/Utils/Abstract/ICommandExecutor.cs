using System.Threading.Tasks;

using BugTracker.Shared.Command.Abstract;
using BugTracker.Shared.Command.Entities;

using JetBrains.Annotations;

namespace BugTracker.Shared.Command.Utils.Abstract
{
    public interface ICommandExecutor
    {
        Task<T> ExecuteAsync<T>([NotNull] CommandCore<T> command) where T : CommandResult;
    }
}