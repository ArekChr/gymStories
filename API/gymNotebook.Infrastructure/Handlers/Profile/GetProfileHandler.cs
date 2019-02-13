using gymNotebook.Infrastructure.Commands;
using gymNotebook.Infrastructure.Commands.Profile;
using gymNotebook.Infrastructure.DTO;
using gymNotebook.Infrastructure.Services;
using System.Threading.Tasks;

namespace gymNotebook.Infrastructure.Handlers.Profile
{
    public class GetProfileHandler : IResultHandler<GetProfile, ProfileDto>
    {
        private readonly IUserProfileService _userProfileService;

        public GetProfileHandler(IUserProfileService userProfileService)
        {
            _userProfileService = userProfileService;
        }

        public async Task<ProfileDto> HandleAsync(GetProfile command)
        {
            return await _userProfileService.GetAsync(command.UserId);
        }
    }
}