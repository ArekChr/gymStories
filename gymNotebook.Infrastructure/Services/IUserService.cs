using gymNotebook.Infrastructure.DTO;
using System.Threading.Tasks;

namespace gymNotebook.Infrastructure.Services
{
    public interface IUserService : IService
    {
        Task<UserDto> GetAsync(string email);

        Task Register(string username, string email, string password);
    }
}
