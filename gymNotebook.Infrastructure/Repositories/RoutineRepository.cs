using gymNotebook.Core.Repositories;
using System;
using System.Collections.Generic;
using gymNotebook.Core.Domain;
using System.Threading.Tasks;
using System.Linq;

namespace gymNotebook.Infrastructure.Repositories
{
    public class RoutineRepository : IRoutineRepository
    {
        private static readonly ISet<Routine> _routines = new HashSet<Routine>();

        public async Task<Routine> GetAsync(Guid id)
            => await Task.FromResult(_routines.SingleOrDefault(x => x.Id == id));

        public async Task<Routine> GetAsync(Guid trainingId, string name)
            => await Task.FromResult(_routines.SingleOrDefault(x => x.TrainingId == trainingId && x.Name == name));

        public async Task AddAsync(Routine routine)
        {
            _routines.Add(routine);
            await Task.CompletedTask;
        }

        public async Task<IEnumerable<Routine>> BrowseAsync(Guid trainingId)
            => await Task.FromResult(_routines.Where(x => x.TrainingId == trainingId).AsEnumerable());

        public async Task DeleteAsync(Routine routine)
        {
            _routines.Remove(routine);
            await Task.CompletedTask;
        }

        public async Task UpdateAsync(Routine routine)
        {
            await Task.CompletedTask;
        }

    }
}
