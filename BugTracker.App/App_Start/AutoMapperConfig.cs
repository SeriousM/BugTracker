using AutoMapper;
using BugTracker.App.Models;
using BugTracker.Data.Entities;

namespace BugTracker.App
{
    public class AutoMapperConfig
    {
        public static void Initialize()
        {
            Mapper.Initialize(config =>
            {
                config.CreateMap<User, UserModel>();
                config.CreateMap<Issue, IssueModel>();
            });
        }
    }
}