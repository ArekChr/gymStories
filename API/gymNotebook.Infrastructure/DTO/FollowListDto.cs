using System.Collections.Generic;
using gymNotebook.Infrastructure.Commands;

namespace gymNotebook.Infrastructure.DTO
{
    public class FollowListDto : IResult
    {
        public IList<FollowDto> FollowList { get; set; }

        public FollowListDto(IList<FollowDto> followList)
        {
            FollowList = followList;
        }
    }
}
