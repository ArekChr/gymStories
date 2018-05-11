using gymNotebook.Core.Domain;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace gymNotebook.Core.Repositories
{
    public interface ITrainingRepository : IRepository
    {
        Task<Training> GetAsync(Guid id);

        Task<Training> GetAsync(Guid userId, string name);

        Task<IEnumerable<Training>> BrowseAsync(Guid userId);

        Task AddAsync(Training training);

        Task UpdateAsync(Training training);

        Task DeleteAsync(Training training);
    }
}
