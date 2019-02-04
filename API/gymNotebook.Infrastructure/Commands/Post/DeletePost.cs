using System;

namespace gymNotebook.Infrastructure.Commands.Posts
{
    public class DeletePost : AuthenticatedCommandBase
    {
        public Guid Id { get; set; }
    }
}
