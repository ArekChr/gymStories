using System;

namespace gymNotebook.Infrastructure.Commands
{
    public class AuthenticatedCommandBase : IAuthenticatedCommand
    {
        public Guid UserId { get; set; }
    }
}
