using System;

namespace BugTracker.App.Attributes
{
    [AttributeUsage(AttributeTargets.Method, AllowMultiple = false, Inherited = true)]
    public class ReturnsModelAttribute : Attribute
    {
        public ReturnsModelAttribute(string modelType)
        {
        }
    }
}