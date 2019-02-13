using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using gymNotebook.Core.Domain;

namespace gymNotebook.Core.Repositories
{
    public interface IFollowRepository : IRepository
    {
        Task<IList<Follow>> BrowseFollowedAsync(Guid userId);
        Task<IList<Follow>> BrowseFollowersAsync(Guid userId);

        Task AddAsync(Follow follow);

        Task DeleteAsync(Follow follow);
    }
}
