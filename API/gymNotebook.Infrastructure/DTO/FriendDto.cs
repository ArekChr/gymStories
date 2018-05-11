using gymNotebook.Core.Domain;
using System;

namespace gymNotebook.Infrastructure.DTO
{
    public class FriendDto
    {
        public Guid UserId { get; set; }

        public Guid FriendId { get; set; }

        public Status? FriendStatus { get; set; }
    }
}
