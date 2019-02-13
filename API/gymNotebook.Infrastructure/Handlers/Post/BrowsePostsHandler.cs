using System.Threading.Tasks;
using gymNotebook.Infrastructure.Commands;
using gymNotebook.Infrastructure.Commands.Post;
using gymNotebook.Infrastructure.DTO;
using gymNotebook.Infrastructure.Services;

namespace gymNotebook.Infrastructure.Handlers.Post
{
    public class BrowsePostsHandler : IResultHandler<BrowsePosts, PostListDto>
    {
        private readonly IPostService _postService;

        public BrowsePostsHandler(IPostService postService)
        {
            _postService = postService;
        }

        public async Task<PostListDto> HandleAsync(BrowsePosts command)
        {
            return await _postService.BrowseAsync(command.UserId, command.StartDate, command.Quantity);
        }
    }
}
