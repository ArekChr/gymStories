using Microsoft.AspNetCore.Mvc;
using gymNotebook.Infrastructure.Services;
using gymNotebook.Infrastructure.Commands;
using gymNotebook.Infrastructure.Commands.Users;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;

namespace gymNotebook.Api.Controllers
{

    [Route("Account")]
    public class AccountController : ApiControllerBase
    {
        //private readonly IUserService _userService;
        private readonly IJwtHandler _jwtHandler;

        public AccountController(ICommandDispatcher commandDispatcher,
            IJwtHandler jwtHandler) : base(commandDispatcher)
        {
            _jwtHandler = jwtHandler;
           // _userService = userService;
        }

        [HttpGet]
        [Route("token")]
        public async Task<IActionResult> Get()
        {
            var token = _jwtHandler.CreateToken("user1@gmail.com", "user123");

            return Json(token);
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