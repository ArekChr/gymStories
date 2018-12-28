using System;
using System.Collections.Generic;
using System.Text;

namespace gymNotebook.Infrastructure.Commands.Trainings.Progress
{
    public class DeleteProgress : AuthenticatedCommandBase
    {
        public Guid Id { get; set; }
    }
}
