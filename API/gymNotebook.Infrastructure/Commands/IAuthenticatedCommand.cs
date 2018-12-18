using System;

namespace gymNotebook.Infrastructure.Commands
{
    public interface IAuthenticatedCommand : ICommand
    {
        Guid UserId { get; set; }
    }
}
