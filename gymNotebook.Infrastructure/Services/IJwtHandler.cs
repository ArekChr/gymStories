using gymNotebook.Infrastructure.DTO;

namespace gymNotebook.Infrastructure.Services
{
    public interface IJwtHandler
    {
        JwtDto CreateToken(string email, string role);
    }
}
