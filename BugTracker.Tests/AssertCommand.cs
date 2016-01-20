using BugTracker.Shared.Command.Entities;

using NUnit.Framework;

namespace BugTracker.Tests
{
    public static class CommandAssert
    {
        public static void IsSuccessful(CommandResult commandResult)
        {
            if (commandResult.IsFailure)
            {
                Assert.Fail($"The commandResult is not successful: {commandResult.ErrorMessage}");
            }
        }
        public static void IsFailure(CommandResult commandResult)
        {
            if (commandResult.IsFailure && commandResult.Exception is Moq.MockException)
            {
                Assert.Fail($"The command failed because of an mock exception: {commandResult.Exception.Message}");
            }

            if (commandResult.IsSuccess)
            {
                Assert.Fail("The commandResult should signal an failed execution, but is instead successful.");
            }
        }
    }
}