using System;
using System.Collections.Generic;

namespace gymNotebook.Core.Domain
{
    public class Post : Entity
    {
        private ISet<Comment> _comments = new HashSet<Comment>();

        public Guid UserId { get; protected set; }
        public string Description { get; protected set; }
        public Guid ImageId { get; protected set; }
        public Image Image { get; protected set; }
        public int Likes { get; protected set; }
        public DateTime CreatedAt { get; protected set; }
        public IEnumerable<Comment> Comments => _comments;
    }
}
