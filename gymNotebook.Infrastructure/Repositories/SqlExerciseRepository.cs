using gymNotebook.Core.Domain;
using gymNotebook.Core.Repositories;
using gymNotebook.Infrastructure.EF;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace gymNotebook.Infrastructure.Repositories
{
    public class SqlExerciseRepository : IExerciseRepository, ISqlRepository
    {
        private readonly GymNotebookContext _context;

        public SqlExerciseRepository(GymNotebookContext context)
        {
            _context = context;
        }

        public async Task<Exercise> GetAsync(Guid id)
            => await _context.Exercises.SingleOrDefaultAsync(x => x.Id == id);


        public async Task<Exercise> GetAsync(Guid routineId, string name)
            => await _context.Exercises.SingleOrDefaultAsync(x => x.RoutineId == routineId && x.Name == name);

        public async Task AddAsync(Exercise exercise)
        {
            await _context.Exercises.AddAsync(exercise);
            await _context.SaveChangesAsync();
        }

        public async Task<IEnumerable<Exercise>> BrowseAsync(Guid routineId)
            => await _context.Exercises.Where(x => x.RoutineId == routineId).ToListAsync();


        public async Task UpdateAsync(Exercise exercise)
        {
            _context.Exercises.Update(exercise);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteAsync(Exercise exercise)
        {
            _context.Exercises.Remove(exercise);
            await _context.SaveChangesAsync();
        }
    }
}
