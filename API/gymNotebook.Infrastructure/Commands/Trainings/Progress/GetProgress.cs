using System;

namespace gymNotebook.Infrastructure.Commands.Trainings.Progress
{
    public class GetProgress : AuthenticatedCommandBase, IResult
    {
        public Guid Id { get; set; }
    }
}
