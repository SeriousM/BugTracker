using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using BugTracker.App.Attributes;

namespace BugTracker.App.Models
{
    public class UserModel
    {
        [Key]
        public Guid Id { get; set; }
        
        public string Firstname { get; set; }
        public string Lastname { get; set; }
        [TypescriptListType("List")]
        public List<PermissionModel> Permissions { get; set; }
    }
}