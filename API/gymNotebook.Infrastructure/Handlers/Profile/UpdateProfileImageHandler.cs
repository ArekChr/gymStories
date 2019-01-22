using gymNotebook.Infrastructure.Commands;
using gymNotebook.Infrastructure.Commands.Profile;
using gymNotebook.Infrastructure.Services;
using System.Threading.Tasks;

namespace gymNotebook.Infrastructure.Handlers.Profile
{
    public class UpdateProfileImageHandler : ICommandHandler<UpdateProfileImage>
    {
        private readonly IUserProfileService _userProfileService;

        public UpdateProfileImageHandler(IUserProfileService userProfileService)
        {
            _userProfileService = userProfileService;
        }

        public async Task HandleAsync(UpdateProfileImage command)
        {
            await _userProfileService.UploadImageAsync(userId: command.UserId, file: command.File);
        }
    }
}
