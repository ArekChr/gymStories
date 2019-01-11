using gymNotebook.Infrastructure.Commands;
using gymNotebook.Infrastructure.Commands.Users;
using gymNotebook.Infrastructure.Services;
using System.Threading.Tasks;

namespace gymNotebook.Infrastructure.Handlers.Users
{
    public class CreateUserHandler : ICommandHandler<CreateUser>
    {
        private readonly IUserService _userService;

        public CreateUserHandler(IUserService userService)
        {
            _userService = userService;
        }

        public async Task HandleAsync(CreateUser command)
        {
            await _userService.RegisterAsync(command.Username, command.Email, command.Password, command.FirstName, command.LastName, command.DateOfBirth, command.Gender);
        }
    }
}
