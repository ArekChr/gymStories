using System;

namespace gymNotebook.Infrastructure.Commands.Follows
{
    public class Unfollow : AuthenticatedCommandBase
    {
        public Guid FollowerId { get; set; }
    }
}
