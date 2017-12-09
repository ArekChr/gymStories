using gymNotebook.Infrastructure.DTO;
using System.Threading.Tasks;

namespace gymNotebook.Infrastructure.Services
{
    public interface IUserService : IService
    {
        Task<UserDto> GetAsync(string email);

        Task RegisterAsync(string username, string email, string password);

        Task LoginAsync(string email, string password);
    }
}
