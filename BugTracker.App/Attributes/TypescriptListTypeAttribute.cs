using System;

namespace BugTracker.App.Attributes
{
    [AttributeUsage(AttributeTargets.Property, AllowMultiple = false, Inherited = true)]
    public class TypescriptListTypeAttribute : Attribute
    {
        private readonly string _name;

        public TypescriptListTypeAttribute(string name)
        {
            _name = name;
        }
    }
}