using System;
using System.Collections.Generic;
using System.Text;

namespace gymNotebook.Infrastructure.Commands.Trainings.Progress
{
    public class DeleteProgress : ICommand
    {
        public Guid Id { get; set; }
    }
}
