using System;
// ReSharper disable UnusedParameter.Local

namespace BugTracker.App.Attributes
{
    /// <summary>
    /// This attribute is used to annotate a list property with "immutable.js" list type.
    /// </summary>
    [AttributeUsage(AttributeTargets.Property, AllowMultiple = false, Inherited = true)]
    public class TypescriptListTypeAttribute : Attribute
    {
        public TypescriptListTypeAttribute(string name)
        {
        }
    }
}