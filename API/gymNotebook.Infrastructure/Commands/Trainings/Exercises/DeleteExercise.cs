using System;
using System.Collections.Generic;
using System.Text;

namespace gymNotebook.Infrastructure.Commands.Trainings.Exercises
{
    public class DeleteExercise : ICommand
    {
        public Guid Id { get; set; }
    }
}
