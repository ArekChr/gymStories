using gymNotebook.Infrastructure.Commands;
using gymNotebook.Infrastructure.Commands.Profile;
using gymNotebook.Infrastructure.DTO;
using gymNotebook.Infrastructure.Services;
using System.Threading.Tasks;

namespace gymNotebook.Infrastructure.Handlers.Profile
{
    public class GetProfileHandler : IResultHandler<GetProfile, ProfileDto>
    {
        private readonly IProfileService _profileService;

        public GetProfileHandler(IProfileService profileService)
        {
            _profileService = profileService;
        }

        public async Task<ProfileDto> HandleAsync(GetProfile command)
        {
            return await _profileService.GetAsync(command.UserId);
        }
    }
}