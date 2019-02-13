using System;

namespace gymNotebook.Infrastructure.Commands.Posts
{
    public class GetPost : AuthenticatedCommandBase
    {
        public Guid Id { get; set; }
    }
}
