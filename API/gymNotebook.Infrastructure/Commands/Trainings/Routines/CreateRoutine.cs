using System;
using System.Collections.Generic;
using System.Text;

namespace gymNotebook.Infrastructure.Commands.Trainings.Routines
{
    public class CreateRoutine : AuthenticatedCommandBase
    {
        public Guid TrainingId { get; set; }

        public string Name { get; set; }
    }
}
