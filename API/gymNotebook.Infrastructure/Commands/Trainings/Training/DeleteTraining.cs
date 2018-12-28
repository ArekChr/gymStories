using System;
using System.Collections.Generic;
using System.Text;

namespace gymNotebook.Infrastructure.Commands.Trainings.Training
{
    public class DeleteTraining : AuthenticatedCommandBase
    {
        public Guid TrainingId { get; set; }
    }
}
