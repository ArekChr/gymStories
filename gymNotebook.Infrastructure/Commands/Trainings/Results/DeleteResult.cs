using System;
using System.Collections.Generic;
using System.Text;

namespace gymNotebook.Infrastructure.Commands.Trainings.Results
{
    public class DeleteResult : ICommand
    {
        public Guid Id { get; set; }
    }
}
