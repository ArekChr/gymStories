using gymNotebook.Infrastructure.DTO;

namespace gymNotebook.Infrastructure.Commands.Posts
{
    public class CreatePost : AuthenticatedCommandBase
    {
        public ImageDto Image { get; set; }

        public PostDto Post { get; set; }
    }
}
