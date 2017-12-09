using gymNotebook.Infrastructure.Commands.Users;
using gymNotebook.Infrastructure.Services;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace gymNotebook.Infrastructure.Commands.Handlers.Users
{
    public class LoginHandler : ICommandHandler<Login>
    {
        private readonly IUserService _userService;

        //private readonly IJwtHandler _jwtHandler;

        public async Task HandleAsync(Login command)
        {
            throw new NotImplementedException();
        }
    }
}
