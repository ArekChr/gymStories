using System;

namespace gymNotebook.Infrastructure.Commands.Follows
{
    public class Follow : AuthenticatedCommandBase
    {
        public Guid FollowerId { get; set; }
    }
}
