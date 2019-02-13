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
    [Route("api/Friend")]
    [Produces("application/json")]
    public class FriendController : ApiControllerBase
    {
        private readonly IFriendService _friendService;

        public FriendController(IFriendService friendService,
            ICommandDispatcher commandDispatcher,
            IResultDispatcher resultDispatcher)
            : base(commandDispatcher, resultDispatcher)
        {
            _friendService = friendService;
        }

        [HttpGet]
        public async Task<IActionResult> Get(Guid friendId)
        {
            var exercises = await _friendService.GetAsync(friendId);

            return Json(exercises);
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromBody]AddFriend command)
        {
            await DispatchAsync(command);

            return NoContent();
        }

        [HttpPut]
        public async Task<IActionResult> Put([FromBody]UpdateFriendStatus command)
        {
            await DispatchAsync(command);

            return NoContent();
        }

        [HttpDelete]
        public async Task<IActionResult> Delete([FromBody]DeleteFriend command)
        {
            await DispatchAsync(command);

            return NoContent();
        }
    }
}