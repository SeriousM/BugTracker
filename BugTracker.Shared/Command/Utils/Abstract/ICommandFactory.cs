using BugTracker.Shared.Command.Abstract;

namespace BugTracker.Shared.Command.Utils.Abstract
{
    public interface ICommandFactory
    {
        TCommand CreateCommand<TCommand, TResult>() where TCommand : CommandBase<TResult>;
        TCommand CreateCommand<TCommand>() where TCommand : CommandBase;
    }
}