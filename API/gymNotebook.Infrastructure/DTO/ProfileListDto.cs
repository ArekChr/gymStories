using System.Collections.Generic;
using gymNotebook.Infrastructure.Commands;

namespace gymNotebook.Infrastructure.DTO
{
    public class ProfileListDto : IResult
    {
        public IEnumerable<ProfileDto> ProfileList { get; set; }

        public ProfileListDto(IEnumerable<ProfileDto> profileList)
        {
            ProfileList = profileList;
        }
    }
}