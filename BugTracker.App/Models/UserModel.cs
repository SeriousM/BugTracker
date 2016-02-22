using System;
using System.ComponentModel.DataAnnotations;
using BugTracker.Data.Entities;

namespace BugTracker.App.Models
{
    public class UserModel
    {
        [Key]
        public Guid Id { get; set; }
        public string Name { get; set; }

        internal static UserModel FromUser(User user)
        {
            var model = new UserModel
            {
                Id = user.Id,
                Name = user.Name
            };

            return model;
        }
    }
}