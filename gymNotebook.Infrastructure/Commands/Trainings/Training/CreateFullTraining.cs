using gymNotebook.Infrastructure.Commands.Trainings.Routines;
using System;
using System.Collections.Generic;

namespace gymNotebook.Infrastructure.Commands.Trainings.Training
{
    public class CreateFullTraining : ICommand
    {
        public Guid UserId { get; set; }

        public Guid TrainingId { get; set; }

        public string Name { get; set; }

        public string Description { get; set; }

        public byte Difficulty { get; set; }

        public IEnumerable<CreateFullRoutine> FullRoutine { get; set; }
    }
}
