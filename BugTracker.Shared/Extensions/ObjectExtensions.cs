using System.Threading.Tasks;

namespace BugTracker.Shared.Extensions
{
    public static class ObjectExtensions
    {
        public static Task<T> ToTaskResult<T>(this T value)
        {
            return Task.FromResult(value);
        }

        public static Maybe<T> ToMaybe<T>(this T value) where T : class
        {
            return new Maybe<T>(value);
        }
    }
}