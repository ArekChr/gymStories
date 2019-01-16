using System;
using System.Collections.Generic;
using System.Text;

namespace gymNotebook.Infrastructure.Commands.Trainings.Results
{
    public class DeleteResult : AuthenticatedCommandBase
    {
        public Guid Id { get; set; }
    }
}
