using System;
// ReSharper disable UnusedParameter.Local

namespace BugTracker.App.Attributes
{
    /// <summary>
    /// This attribute is used to annotate a controller method to return a list of pocos (string, int, plain objects).
    /// </summary>
    [AttributeUsage(AttributeTargets.Method, AllowMultiple = false, Inherited = true)]
    public class ReturnsPocosAttribute : Attribute
    {
        // note: the empty constructor body is ok, we just need the attribute on the property to get the information into typewriter
        public ReturnsPocosAttribute(TypescriptIterable listType, string type)
        {
        }
    }
}