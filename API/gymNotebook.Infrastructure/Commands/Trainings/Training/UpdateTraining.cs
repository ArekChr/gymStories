using System;
using System.Collections.Generic;
using System.Text;

namespace gymNotebook.Infrastructure.Commands.Trainings.Training
{
    public class UpdateTraining : ICommand
    {
        public Guid TrainingId { get; set; }

        public string Name { get; set; }

        public string Description { get; set; }

        public byte Difficulty { get; set; }
    }
}
