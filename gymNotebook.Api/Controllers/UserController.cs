using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using gymNotebook.Infrastructure.Services;
using gymNotebook.Infrastructure.Commands.Users;
using gymNotebook.Infrastructure.Commands;

namespace gymNotebook.Api.Controllers
{
    public class UserController : ApiControllerBase
    {
        private readonly IUserService _userService;

        public UserController(IUserService userService, 
            ICommandDispatcher commandDispatcher) : base(commandDispatcher)
        {
            _userService = userService;
        }

        // GET users/5
        [HttpGet("{email}")]
        public async Task<IActionResult> Get(string email)
        {  
            var user =await _userService.GetAsync(email);
            if(user == null)
            {
                return NotFound();
            }
            return Json(user);
        }
        // GET users
        [HttpGet]
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // POST users
        [HttpPost("")]
        public async Task<IActionResult> Post([FromBody]CreateUser command)
        {
            await CommandDispatcher.DispatchAsync(command);

            return Created($"users/{command.Email}", new object());
        }

        // DELETE users/5
        [HttpDelete("{userId}")]
        public void Delete(int id)
        {
        }
    }
}
