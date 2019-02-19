using gymNotebook.Infrastructure.Commands;
using gymNotebook.Infrastructure.Commands.Post;
using gymNotebook.Infrastructure.DTO;
using gymNotebook.Infrastructure.Services;
using System.Threading.Tasks;

namespace gymNotebook.Infrastructure.Handlers.Post
{
    public class BrowsePostCommentHandler : IResultHandler<BrowsePostComments, CommentListDto>
    {
        private readonly ICommentPostService _commentPostService;

        public BrowsePostCommentHandler(ICommentPostService commentPostService)
        {
            _commentPostService = commentPostService;
        }
        public async Task<CommentListDto> HandleAsync(BrowsePostComments command)
        {
            return await _commentPostService.BrowseAsync(command.PostId);
        }
    }
}
