using System;
using System.Collections.Generic;
using System.Text;

namespace gymNotebook.Infrastructure.Commands.Trainings.Training
{
    public class DeleteTraining : ICommand
    {
        public Guid trainingId { get; set; }
    }
}
