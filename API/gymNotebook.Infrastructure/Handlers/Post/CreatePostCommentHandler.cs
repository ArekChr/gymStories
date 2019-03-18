using gymNotebook.Infrastructure.Commands;
using gymNotebook.Infrastructure.Commands.Comment;
using gymNotebook.Infrastructure.DTO;
using gymNotebook.Infrastructure.Services;
using System.Threading.Tasks;

namespace gymNotebook.Infrastructure.Handlers.Profile
{
    public class CreatePostCommentHandler : IResultHandler<CreatePostComment, CommentDto>
    {
        private readonly ICommentPostService _commentPostService;

        public CreatePostCommentHandler(ICommentPostService commentPostService)
        {
            _commentPostService = commentPostService;
        }
        public async Task<CommentDto> HandleAsync(CreatePostComment command)
        {
            return await _commentPostService.CreateAsync(command.PostId, command.UserId, command.Content);
        }
    }
}
