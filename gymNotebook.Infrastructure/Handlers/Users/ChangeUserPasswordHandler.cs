using gymNotebook.Infrastructure.Commands;
using gymNotebook.Infrastructure.Commands.Users;
using System.Threading.Tasks;

namespace gymNotebook.Infrastructure.Handlers.Users
{
    public class ChangeUserPasswordHandler : ICommandHandler<ChangeUserPassword>
    {
        public async Task HandleAsync(ChangeUserPassword command)
        {
            await Task.CompletedTask;
        }
    }
}
