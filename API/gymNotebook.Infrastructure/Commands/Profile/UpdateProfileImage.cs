using Microsoft.AspNetCore.Http;

namespace gymNotebook.Infrastructure.Commands.Profile
{
    public class UpdateProfileImage : AuthenticatedCommandBase
    {
        public IFormFile File { get; set; }
    }
}
