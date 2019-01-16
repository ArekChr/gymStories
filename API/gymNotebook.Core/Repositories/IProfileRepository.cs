using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using gymNotebook.Core.Domain;

namespace gymNotebook.Core.Repositories
{
    public interface IProfileRepository : IRepository
    {
        Task<Profile> GetAsync(Guid id);

        Task<IEnumerable<Profile>> BrowseAsync();

        Task<IEnumerable<Profile>> SearchAsync(string[] paramStrings);

        Task AddAsync(Profile profile);

        Task UpdateAsync(Profile profile);

        Task DeleteAsync(Profile profile);
    }
}
