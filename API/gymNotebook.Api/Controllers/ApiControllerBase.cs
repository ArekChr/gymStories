using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using gymNotebook.Infrastructure.Commands;
using System.Collections.Generic;

namespace gymNotebook.Api.Controllers
{
    [Route("[controller]")]
    public abstract class ApiControllerBase : Controller
    {
        protected readonly ICommandDispatcher CommandDispatcher;
        protected readonly IResultDispatcher ResultDispatcher;

        protected ApiControllerBase(ICommandDispatcher commandDispatcher, IResultDispatcher resultDispatcher)
        {
            CommandDispatcher = commandDispatcher;
            ResultDispatcher = resultDispatcher;
        }

        protected async Task DispatchAsync<T>(T command) where T : ICommand
        {
            if (command is IAuthenticatedCommand authenticatedCommand)
            {
                authenticatedCommand.UserId = UserId;
            }
            await CommandDispatcher.DispatchAsync(command);
        }

        protected async Task<R> DispatchAsync<T, R>(T command) where T : ICommand where R : IResult
        {
            if (command is IAuthenticatedCommand authenticatedCommand)
            {
                authenticatedCommand.UserId = UserId;
            }
            var result = await ResultDispatcher.DispatchAsync<T, R>(command);
            return result;
        }

        protected Guid UserId => User?.Identity?.IsAuthenticated == true ?
            Guid.Parse(User.Identity.Name) :
            Guid.Empty;
    }
}