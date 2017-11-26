using gymNotebook.Core.Domain;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace gymNotebook.Core.Repositories
{
    public interface IRoutineRepository : IRepository
    {
        Task<Routine> GetAsync(Guid id);

        Task<Routine> GetAsync(Guid trainingId, string name);

        Task<IEnumerable<Routine>> BrowseAsync(Guid trainingId);

        Task AddAsync(Routine routine);

        Task UpdateAsync(Routine routine);

        Task DeleteAsync(Routine routine);
    }
}
