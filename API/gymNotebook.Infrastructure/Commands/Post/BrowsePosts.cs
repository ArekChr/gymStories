using System;

namespace gymNotebook.Infrastructure.Commands.Post
{
    public class BrowsePosts : AuthenticatedCommandBase
    {
        public DateTime StartDate { get; set; }

        public int Quantity { get; set; }
    }
}
