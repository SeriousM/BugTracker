namespace BugTracker.App.Attributes
{
    public class TypescriptListTypeAttribute : System.Attribute
    {
        private readonly string _name;

        public TypescriptListTypeAttribute(string name)
        {   
            _name = name;
        }
    }
}