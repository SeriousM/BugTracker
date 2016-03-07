using System;
using System.Threading.Tasks;
using AutoMapper;
using BugTracker.App.Models;
using BugTracker.Data.Repositories.Abstract;
using BugTracker.Shared.Command.Abstract;
using BugTracker.Shared.Command.Entities;
using BugTracker.Shared.Extensions;

namespace BugTracker.App.Commands
{
    public class GetIssueByIdCommand : CommandBase<IssueModel>
    {
        private readonly IIssueAccess issueAccess;
        private Guid issueId;

        public GetIssueByIdCommand(IIssueAccess issueAccess)
        {
            this.issueAccess = issueAccess;
        }

        public void Initialize(Guid issueId)
        {
            this.issueId = issueId;
        }

        protected override Task<CanExecuteCommandResult> CanExecuteAsync()
        {
            if (this.issueId == Guid.Empty)
            {
                return this.CannotExecute("Invalid Issue ID").ToTaskResult();
            }

            return base.CanExecuteAsync();
        }

        protected override Task<CommandResult<IssueModel>> ExecuteAsync()
        {
            var foundIssue = this.issueAccess.Get(this.issueId);
            if (foundIssue == null)
            {
                return this.ExecutionError("The issue model is null.").ToTaskResult();
            }

            var model = Mapper.Map<IssueModel>(foundIssue);
            return this.SuccessExecution(model).ToTaskResult();
        }
    }
}