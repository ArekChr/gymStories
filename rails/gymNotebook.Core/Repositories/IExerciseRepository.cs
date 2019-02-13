using gymNotebook.Core.Domain;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace gymNotebook.Core.Repositories
{
    public interface IExerciseRepository : IRepository
    {
        Task<Exercise> GetAsync(Guid id);

        Task<Exercise> GetAsync(Guid routineId, string name);

        Task<IEnumerable<Exercise>> BrowseAsync(Guid routineId);

        Task AddAsync(Exercise exercise);

        Task UpdateAsync(Exercise exercise);

        Task DeleteAsync(Exercise exercise);
    }
}
