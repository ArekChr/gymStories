using gymNotebook.Core.Repositories;
using System;
using System.Collections.Generic;
using System.Text;
using gymNotebook.Core.Domain;
using System.Threading.Tasks;
using System.Linq;

namespace gymNotebook.Infrastructure.Repositories
{
    public class ExerciseRepository : IExerciseRepository
    {
        private static readonly ISet<Exercise> _exercises = new HashSet<Exercise>();

        public async Task<Exercise> GetAsync(Guid id)
            => await Task.FromResult(_exercises.SingleOrDefault(x => x.Id == id));

        public async Task<Exercise> GetAsync(Guid routineId, string name)
            => await Task.FromResult(_exercises.SingleOrDefault(x => x.RoutineId == routineId && x.Name == name));

        public async Task AddAsync(Exercise exercise)
        {
            _exercises.Add(exercise);
            await Task.CompletedTask;
        }

        public async Task<IEnumerable<Exercise>> BrowseAsync(Guid routineId)
            => await Task.FromResult(_exercises.Where(x => x.RoutineId == routineId).AsEnumerable());

        public async Task DeleteAsync(Exercise exercise)
        {
            _exercises.Remove(exercise);
            await Task.CompletedTask;
        }

        public async Task UpdateAsync(Exercise exercise)
        {
            await Task.CompletedTask;
        }
    }
}
