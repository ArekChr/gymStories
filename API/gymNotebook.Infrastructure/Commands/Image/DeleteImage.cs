using System;
using System.Collections.Generic;
using System.Text;

namespace gymNotebook.Infrastructure.Commands.Image
{
    public class DeleteImage : AuthenticatedCommandBase
    {
        public Guid Id { get; set; }
    }
}
