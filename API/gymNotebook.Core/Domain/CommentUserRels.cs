using System;

namespace gymNotebook.Core.Domain
{
    public class CommentUserRels : Entity
    {
        public Guid UserId { get; private set; }
        public User User { get; private set; }
        public Guid CommentId { get; private set; }
        public Comment Comment { get; private set; }

        protected CommentUserRels()
        {
        }

        public CommentUserRels(Guid userId, Guid commentId)
        {
            UserId = userId;
            CommentId = commentId;
        }
    }
}
