using System;
// ReSharper disable UnusedParameter.Local

namespace BugTracker.App.Attributes
{
    /// <summary>
    /// This attribute is used to annotate a list property with "immutable.js" list type.
    /// </summary>
    [AttributeUsage(AttributeTargets.Property | AttributeTargets.Parameter, AllowMultiple = false, Inherited = true)]
    public class TypescriptIterableTypeAttribute : Attribute
    {
        // note: the empty constructor body is ok, we just need the attribute on the property to get the information into typewriter
        public TypescriptIterableTypeAttribute(TypescriptIterable iterable)
        {
        }
    }
}