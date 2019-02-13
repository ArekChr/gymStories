using gymNotebook.Infrastructure.Commands;
using gymNotebook.Infrastructure.Commands.Profile;
using gymNotebook.Infrastructure.Services;
using System.Threading.Tasks;

namespace gymNotebook.Infrastructure.Handlers.Profile
{
    public class UpdateProfileDataHandler : ICommandHandler<UpdateProfileData>
    {
        private readonly IUserProfileService _userProfileService;

        public UpdateProfileDataHandler(IUserProfileService userProfileService)
        {
            _userProfileService = userProfileService;
        }

        public async Task HandleAsync(UpdateProfileData command)
        {
            await _userProfileService.UpdateProfileAsync(command);
        }
    }
}
