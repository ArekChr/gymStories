using System;

namespace gymNotebook.Infrastructure.Commands.Post
{
    public class BrowsePostComments : AuthenticatedCommandBase
    {
        public Guid PostId { get; set; }
    }
}
