using System;
using System.Collections.Generic;

namespace gymNotebook.Core.Domain
{
    public class Post : Entity
    {
        private ISet<CommentPostRels> _comments = new HashSet<CommentPostRels>();

        public Guid UserId { get; protected set; }
        public string Description { get; protected set; }
        public Guid ImageId { get; protected set; }
        public int Likes { get; protected set; }
        public DateTime CreatedAt { get; protected set; }

        public Image Image { get; protected set; }
        public User User { get; protected set; }
        public IEnumerable<CommentPostRels> CommentPostRels => _comments;

        protected Post()
        {
        }

        public Post(string description, Guid imageId, Guid userId)
        {
            Description = description;
            ImageId = imageId;
            UserId = userId;
            Likes = 0;
            CreatedAt = DateTime.UtcNow;
        }
    }
}
