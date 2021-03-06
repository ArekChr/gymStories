﻿using gymNotebook.Infrastructure.Commands;
using gymNotebook.Infrastructure.Commands.Users;
using gymNotebook.Infrastructure.Extensions;
using gymNotebook.Infrastructure.Services;
using Microsoft.Extensions.Caching.Memory;
using System.Threading.Tasks;

namespace gymNotebook.Infrastructure.Handlers.Users
{
    public class LoginHandler : ICommandHandler<Login>
    {
        private readonly IUserService _userService;
        private readonly IMemoryCache _cache;
        private readonly IJwtHandler _jwt;

        public LoginHandler(IUserService userService, IMemoryCache cache, IJwtHandler jwt)
        {
            _userService = userService;
            _cache = cache;
            _jwt = jwt;
        }

        public async Task HandleAsync(Login command)
        {
            await _userService.LoginAsync(command.Email, command.Password);
            var user = await _userService.GetAsync(command.Email);
            var jwt = _jwt.CreateToken(user.Id, user.Role);
            _cache.SetJwt(command.TokenId, jwt);
        }
           
    }
}
