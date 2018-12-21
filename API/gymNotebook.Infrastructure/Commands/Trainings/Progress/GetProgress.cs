using System;

namespace gymNotebook.Infrastructure.Commands.Trainings.Progress
{
    public class GetProgress : ICommand
    {
        public Guid Id { get; set; }
    }
}
