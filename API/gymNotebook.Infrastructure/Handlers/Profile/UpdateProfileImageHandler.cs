using gymNotebook.Infrastructure.Commands;
using gymNotebook.Infrastructure.Commands.Profile;
using gymNotebook.Infrastructure.DTO;
using gymNotebook.Infrastructure.Services;
using System;
using System.Threading.Tasks;

namespace gymNotebook.Infrastructure.Handlers.Profile
{
    public class UpdateProfileImageHandler : IResultHandler<UpdateProfileImage, ImageGuid>
    {
        private readonly IUserProfileService _userProfileService;

        public UpdateProfileImageHandler(IUserProfileService userProfileService)
        {
            _userProfileService = userProfileService;
        }

        public async Task<ImageGuid> HandleAsync(UpdateProfileImage command)
        {
            return await _userProfileService.UploadImageAsync(userId: command.UserId, file: command.File);
        }
    }
}
