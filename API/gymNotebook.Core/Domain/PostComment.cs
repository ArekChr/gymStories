using System;

namespace gymNotebook.Core.Domain
{
    public class PostComment : Comment
    {
        public Guid CommentedPost { get; private set; }
        public Post Post { get; private set; }
    }
}
