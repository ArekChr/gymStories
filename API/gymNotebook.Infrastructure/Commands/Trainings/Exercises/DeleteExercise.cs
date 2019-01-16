using System;
using System.Collections.Generic;
using System.Text;

namespace gymNotebook.Infrastructure.Commands.Trainings.Exercises
{
    public class DeleteExercise : AuthenticatedCommandBase
    {
        public Guid Id { get; set; }
    }
}
