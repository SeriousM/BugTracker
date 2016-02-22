using System.Collections.Generic;

using BugTracker.App.Attributes;

namespace BugTracker.App.Models
{
    public class AppState
    {
        [TypescriptIterableType("List")]
        public List<UserModel> Users { get; set; }
        [TypescriptIterableType("List")]
        public List<IssueModel> Issues { get; set; }
        public CurrentUserState CurrentUser { get; set; }
    }
}