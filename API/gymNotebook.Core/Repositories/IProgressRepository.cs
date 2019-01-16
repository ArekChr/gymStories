using gymNotebook.Core.Domain;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace gymNotebook.Core.Repositories
{
    public interface IProgressRepository : IRepository
    {
        Task<Progress> GetAsync(Guid id);

        Task<Progress> GetAsync(Guid userId, DateTime date);

        Task<IEnumerable<Progress>> BrowseAsync(Guid userId);

        Task AddAsync(Progress progress);

        Task UpdateAsync(Progress progress);

        Task DeleteAsync(Progress progress);
    }
}
