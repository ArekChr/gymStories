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
        public int CommentCount { get; protected set; }

        public string ImageURL => $"http:/192.168.178.91:5001/api/Image/{ImageId.ToString()}";
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
            CommentCount = 0;
            CreatedAt = DateTime.UtcNow;
        }

        public void IncrementComent()
        {
            CommentCount = CommentCount++;
        }
    }
}
