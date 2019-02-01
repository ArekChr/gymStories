using System.Threading.Tasks;
using gymNotebook.Infrastructure.Commands;
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
    }
}