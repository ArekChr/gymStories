using Microsoft.AspNetCore.Mvc;
using gymNotebook.Infrastructure.Services;
using gymNotebook.Infrastructure.Commands;
using gymNotebook.Infrastructure.Commands.Users;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.CodeAnalysis.CSharp;

namespace gymNotebook.Api.Controllers
{

    [Route("api/Account")]
    [Produces("application/json")]
    public class AccountController : ApiControllerBase
    {
        private readonly IJwtHandler _jwtHandler;

        public AccountController(ICommandDispatcher commandDispatcher, IJwtHandler jwtHandler) : base(commandDispatcher)
        {
            _jwtHandler = jwtHandler;
        }

        [HttpPut]
        [Route("password")]
        public async Task<IActionResult> Put([FromBody]ChangeUserPassword command)
        {
            await DispatchAsync(command);

            return NoContent();
        }
    }
}