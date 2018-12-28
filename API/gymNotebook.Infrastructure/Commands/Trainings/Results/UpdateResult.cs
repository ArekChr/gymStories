using System;
using System.Collections.Generic;
using System.Text;

namespace gymNotebook.Infrastructure.Commands.Trainings.Results
{
    public class UpdateResult : AuthenticatedCommandBase
    {
        public Guid Id { get; set; }

        public int NumberSeries { get; set; }

        public int Repetitions { get; set; }

        public float Weigth { get; set; }

        public string Comments { get; set; }
    }
}
