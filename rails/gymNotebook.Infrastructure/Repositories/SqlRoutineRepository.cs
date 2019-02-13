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
    public class SqlRoutineRepository : IRoutineRepository, ISqlRepository
    {
        private readonly GymNotebookContext _context;

        public SqlRoutineRepository(GymNotebookContext context)
        {
            _context = context;
        }
        public async Task AddAsync(Routine routine)
        {
            await _context.Routines.AddAsync(routine);
            await _context.SaveChangesAsync();
        }

        public async Task<IEnumerable<Routine>> BrowseAsync(Guid trainingId)
            => await _context.Routines.Where(x => x.TrainingId == trainingId).ToListAsync();

        public async Task DeleteAsync(Routine routine)
        {
            _context.Routines.Remove(routine);
            await _context.SaveChangesAsync();
        }

        public async Task<Routine> GetAsync(Guid id)
            => await _context.Routines.SingleOrDefaultAsync(x => x.Id == id);

        public async Task<Routine> GetAsync(Guid trainingId, string name)
            => await _context.Routines.SingleOrDefaultAsync(x => x.TrainingId == trainingId && x.Name == name);

        public async Task UpdateAsync(Routine routine)
        {
            _context.Routines.Update(routine);
            await _context.SaveChangesAsync();
        }
    }
}
