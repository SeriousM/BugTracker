using System;
// ReSharper disable UnusedParameter.Local

namespace BugTracker.App.Attributes
{
    /// <summary>
    /// This attribute is used to annotate a controller method to return a model.
    /// </summary>
    [AttributeUsage(AttributeTargets.Method, AllowMultiple = false, Inherited = true)]
    public class ReturnsModelAttribute : Attribute
    {
        // note: the empty constructor body is ok, we just need the attribute on the property to get the information into typewriter
        public ReturnsModelAttribute(string modelType)
        {
        }
    }
}