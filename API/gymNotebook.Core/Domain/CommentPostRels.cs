using System;

namespace gymNotebook.Core.Domain
{
    public class CommentPostRels : Entity
    {
        public Guid PostId { get; private set; }
        public Post Post { get; private set; }
        public Guid CommentId { get; private set; }
        public Comment Comment { get; private set; }

        protected CommentPostRels()
        {
        }

        public CommentPostRels(Guid postId, Guid userId, string content)
        {
            PostId = postId;
            Comment = new Comment(userId, content);
            CommentId = Comment.Id;
        }
    }
}
