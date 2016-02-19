namespace BugTracker.App.Attributes
{
    public class TypescriptListType : System.Attribute
    {
        private readonly string _name;

        public TypescriptListType(string name)
        {   
            _name = name;
        }
    }
}