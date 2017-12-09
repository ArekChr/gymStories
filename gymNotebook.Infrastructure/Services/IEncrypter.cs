using System;
using System.Collections.Generic;
using System.Text;

namespace gymNotebook.Infrastructure.Services
{
    public interface IEncrypter
    {
        string GetHash(string value, string salt);

        string GetSalt(string value);
    }
}
