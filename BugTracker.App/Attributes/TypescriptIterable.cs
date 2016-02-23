using System;

namespace BugTracker.App.Attributes
{
    public enum TypescriptIterable
    {
        List,
        Stack,
        Set,
        OrderedSet,
        [Obsolete("Not implemented yet.")] Map,
        [Obsolete("Not implemented yet.")] OrderedMap
    }
}