using System;

namespace gymNotebook.Core.Domain
{
    public class Follow : Entity
    {
        public Guid Follower { get; protected set; }
        public Guid Followed { get; protected set; }
        public DateTime CreatedAt { get; protected set; }

        protected Follow()
        {
        }

        public Follow(Guid follower, Guid followed)
        {
            Follower = follower;
            Followed = followed;
        }
    }
}
