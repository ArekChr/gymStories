using Microsoft.AspNetCore.Mvc;
using gymNotebook.Infrastructure.Services;
using gymNotebook.Infrastructure.Commands;
using gymNotebook.Infrastructure.Commands.Users;
using System.Threading.Tasks;

namespace gymNotebook.Api.Controllers
{
    [Route("Account")]
    public class AccountController : ApiControllerBase
    {
        //private readonly IUserService _userService;

        public AccountController(ICommandDispatcher commandDispatcher) : base(commandDispatcher)
        {
           // _userService = userService;
        }

        [HttpPut]
        [Route("password")]
        public async Task<IActionResult> Put([FromBody]ChangeUserPassword command)
        {
            await CommandDispatcher.DispatchAsync(command);

            return NoContent();
        }
    }
}