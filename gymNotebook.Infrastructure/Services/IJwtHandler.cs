using gymNotebook.Infrastructure.DTO;
using System;
using System.Collections.Generic;
using System.Text;

namespace gymNotebook.Infrastructure.Services
{
    public interface IJwtHandler
    {
        JwtDto CreateToken(string email, string role);
    }
}
