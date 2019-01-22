using System;
using System.Threading.Tasks;
using gymNotebook.Infrastructure.Commands;
using gymNotebook.Infrastructure.Commands.Users;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Caching.Memory;
using gymNotebook.Infrastructure.Extensions;

namespace gymNotebook.Api.Controllers
{
    [Produces("application/json")]
    [Route("api/Login")]
    public class LoginController : ApiControllerBase
    {
        private readonly IMemoryCache _cache;

        public LoginController(IMemoryCache cache,
            ICommandDispatcher commandDispatcher,
            IResultDispatcher resultDispatcher)
            : base(commandDispatcher, resultDispatcher)
        {
            _cache = cache;
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromBody]Login command)
        {
            command.TokenId = Guid.NewGuid();
            await CommandDispatcher.DispatchAsync(command);
            var jwt = _cache.GetJwt(command.TokenId);

            return Json(jwt);
        }
    }
}