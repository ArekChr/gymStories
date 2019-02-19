using System;

namespace gymNotebook.Core.Domain
{
    public class Comment : Entity
    {
        public Guid UserId { get; protected set; }
        public User User { get; protected set; }
        public string Content { get; protected set; }
        public int Likes { get; protected set; }
        public DateTime CreatedAt { get; protected set; }

        protected Comment()
        {
        }

        public Comment(Guid userId, string content)
        {
            UserId = userId;
            Content = content;
            CreatedAt = DateTime.UtcNow;
            Likes = 0;
        }
    }
}
