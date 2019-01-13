using System;
using gymNotebook.Infrastructure.DTO;
using System.Threading.Tasks;

namespace gymNotebook.Infrastructure.Services
{
    public interface IUserService : IService
    {
        Task<UserDto> GetAsync(string email);

        Task RegisterAsync(string email, string password, string firstName, string lastName, DateTime dateOfBirth, string gender);

        Task LoginAsync(string email, string password);
    }
}
