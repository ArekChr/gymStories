using System;
using System.Collections.Generic;
using System.Text;

namespace gymNotebook.Infrastructure.Commands.Trainings.Results
{
    public class CreateResult : AuthenticatedCommandBase
    {
        public Guid ExerciseId { get; set; }

        public int NumberSeries { get; set; }

        public int Repetitions { get; set; }

        public float Weigth { get; set; }

        public string Comments { get; set; }
    }
}
