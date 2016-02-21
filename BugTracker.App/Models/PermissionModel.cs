using System;
using System.ComponentModel.DataAnnotations;

namespace BugTracker.App.Models
{
    public class PermissionModel
    {
        [Key]
        public Guid Id { get; set; }

        public string Name { get; set; }
    }
}