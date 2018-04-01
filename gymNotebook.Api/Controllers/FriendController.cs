using System;
using System.Threading.Tasks;
using gymNotebook.Infrastructure.Commands;
using gymNotebook.Infrastructure.Commands.Friends;
using gymNotebook.Infrastructure.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace gymNotebook.Api.Controllers
{
    [Produces("application/json")]
    [Route("api/Friend")]
    public class FriendController : ApiControllerBase
    {
        private readonly IFriendService _friendService;

        public FriendController(IFriendService friendService, ICommandDispatcher commandDispatcher) : base (commandDispatcher)
        {
            _friendService = friendService;
        }

        // GET: api/Friend/5
        [HttpGet("{name}")]
        public async Task<IActionResult> Get(Guid friendId)
        {
            var exercises = await _friendService.GetAsync(friendId);

            return Json(exercises);
        }

        // POST: api/Friend
        [HttpPost]
        public async Task<IActionResult> Post([FromBody]AddFriend command)
        {
            await CommandDispatcher.DispatchAsync(command);

            return NoContent();
        }

        // PUT: api/Friend/5
        [HttpPut("{id}")]
        public async Task<IActionResult> Put([FromBody]UpdateFriendStatus command)
        {
            await CommandDispatcher.DispatchAsync(command);

            return NoContent();
        }

        // DELETE: api/Friend/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete([FromBody]DeleteFriend command)
        {
            await CommandDispatcher.DispatchAsync(command);

            return NoContent();
        }
    }
}