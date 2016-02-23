using System;

namespace BugTracker.App.Attributes
{
    [AttributeUsage(AttributeTargets.Method, AllowMultiple = false, Inherited = true)]
    public class ReturnsModelsAttribute : Attribute
    {
        public ReturnsModelsAttribute(TypescriptIterable listType, string modelType)
        {
        }    
    }
}