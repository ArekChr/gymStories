using gymNotebook.Infrastructure.Commands.Trainings.Exercises;
using System;
using System.Collections.Generic;

namespace gymNotebook.Infrastructure.Commands.Trainings.Routines
{
    public class CreateFullRoutine : AuthenticatedCommandBase
    {
        public Guid TrainingId { get; set; }

        public string Name { get; set; }

        public IEnumerable<CreateExercise> Exercises;
    }
}
