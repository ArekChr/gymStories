using System;

namespace gymNotebook.Core.Domain
{
    public class Friend : Entity
    {
        public Guid UserId { get; protected set; }

        public Guid FriendId { get; protected set; }

        public Status? FriendStatus { get; protected set; }

        public DateTime DateAdded { get; protected set; }

        protected Friend()
        {
        }

        public Friend(Guid userId, Guid friendId, Status status)
        {
            UserId = userId;
            FriendId = friendId;
            FriendStatus = status;
            DateAdded = DateTime.UtcNow;
        }

        public void SetStatus(Status status)
        {
            FriendStatus = status;
        }
    }

    public enum Status
    {
        Received,
        Sent,
        Blocked,
        Friends,
        Discard
    }
}
