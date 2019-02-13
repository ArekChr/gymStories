using System;

namespace gymNotebook.Core.Domain
{
    public class Follow : Entity
    {
        public Guid FollowerId { get; protected set; }
        public User Follower { get; protected set; }
        public Guid FollowedId { get; protected set; }
        public User Followed { get; protected set; }
        public DateTime CreatedAt { get; protected set; }

        protected Follow()
        {
        }

        public Follow(Guid followerId, Guid followedId)
        {
            FollowerId = followerId;
            FollowedId = followedId;
        }
    }
}
