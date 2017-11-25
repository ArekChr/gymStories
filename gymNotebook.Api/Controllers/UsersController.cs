using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using gymNotebook.Infrastructure.Services;
using gymNotebook.Infrastructure.DTO;
using gymNotebook.Infrastructure.Commands.Users;

namespace gymNotebook.Api.Controllers
{
    [Route("[controller]")]
    public class UsersController : Controller
    {
        private readonly IUserService _userService;

        public UsersController(IUserService userService)
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
            await _userService.Register(command.Email, command.Username, command.Password);

            return Created($"users/{command.Email}", new object());
        }

        // PUT users/5
        [HttpPut("{userId}")]
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE users/5
        [HttpDelete("{userId}")]
        public void Delete(int id)
        {
        }
    }
}
