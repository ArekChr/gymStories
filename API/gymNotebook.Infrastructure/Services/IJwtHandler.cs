using gymNotebook.Infrastructure.DTO;
using System;

namespace gymNotebook.Infrastructure.Services
{
    public interface IJwtHandler
    {
        JwtDto CreateToken(Guid userId, string role);
    }
}
