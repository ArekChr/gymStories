using gymNotebook.Infrastructure.DTO;
using Microsoft.AspNetCore.Http;

namespace gymNotebook.Infrastructure.Commands.Post
{
    public class CreatePost : AuthenticatedCommandBase
    {
        public IFormFile Image { get; set; }

        public string Description { get; set; }
    }
}
