using System;
// ReSharper disable UnusedParameter.Local

namespace BugTracker.App.Attributes
{
    /// <summary>
    /// This attribute is used to annotate a controller method to return a list of models in the shape of an "immutable.js" list type.
    /// </summary>
    [AttributeUsage(AttributeTargets.Method, AllowMultiple = false, Inherited = true)]
    public class ReturnsModelsAttribute : Attribute
    {
        // note: the empty constructor body is ok, we just need the attribute on the property to get the information into typewriter
        public ReturnsModelsAttribute(TypescriptIterable listType, string modelType)
        {
        }
    }
}