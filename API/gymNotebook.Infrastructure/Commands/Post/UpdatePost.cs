using System;
using System.Collections.Generic;
using System.Text;

namespace gymNotebook.Infrastructure.Commands.Posts
{
    public class UpdatePost : AuthenticatedCommandBase
    {
        public Guid Id { get; set; }
        public string Description { get; set; }
    }
}
