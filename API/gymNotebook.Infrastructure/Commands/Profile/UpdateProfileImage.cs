using Microsoft.AspNetCore.Http;

namespace gymNotebook.Infrastructure.Commands.Profile
{
    public class UpdateProfileImage : AuthenticatedCommandBase, IResult
    {
        public IFormFile File { get; set; }
    }
}
