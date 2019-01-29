using System;
using gymNotebook.Infrastructure.Commands;

namespace gymNotebook.Infrastructure.DTO
{
    public class FollowDto : IResult
    {
        public Guid Follower { get; set; }
        public Guid Followed { get; set; }
    }
}
