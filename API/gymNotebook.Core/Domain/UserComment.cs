using System;

namespace gymNotebook.Core.Domain
{
    public class UserComment : Comment
    {
        public Guid CommentedUset { get; set; }
    }
}
