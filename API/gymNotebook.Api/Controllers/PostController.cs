using System.Threading.Tasks;
using gymNotebook.Infrastructure.Commands;
using gymNotebook.Infrastructure.Commands.Comment;
using gymNotebook.Infrastructure.Commands.Post;
using gymNotebook.Infrastructure.DTO;
using Microsoft.AspNetCore.Mvc;

namespace gymNotebook.Api.Controllers
{
    [Produces("application/json")]
    [Route("api/Post")]
    public class PostController : ApiControllerBase
    {
        public PostController(ICommandDispatcher commandDispatcher, IResultDispatcher resultDispatcher)
            : base(commandDispatcher, resultDispatcher)
        {
        }

        [HttpGet]
        public async Task<IActionResult> BrowsePosts(BrowsePosts command)
        {
            var posts = await DispatchAsync<BrowsePosts, PostListDto>(command);

            return Ok(posts.PostList);
        }

        [HttpPost]
        [Route("Comment")]
        public async Task<IActionResult> CreateComment([FromBody]CreatePostComment command)
        {
            var response = await DispatchAsync<CreatePostComment, CommentDto>(command);

            return Created($"Post/{command.PostId}/Comments", response);
        }

        [HttpGet("Comments")]
        public async Task<IActionResult> BrowseComment(BrowsePostComments command)
        {
            var comments = await DispatchAsync<BrowsePostComments, CommentListDto>(command);

            return Ok(comments.CommentList);
        }
    }
}