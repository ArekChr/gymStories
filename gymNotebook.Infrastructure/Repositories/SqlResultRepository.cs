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
    public class SqlResultRepository : IResultRepository, ISqlRepository
    {
        private readonly GymNotebookContext _context;

        public SqlResultRepository(GymNotebookContext context)
        {
            _context = context;
        }

        public async Task<Result> GetAsync(Guid id)
            => await _context.Results.SingleOrDefaultAsync(x => x.Id == id);


        public async Task<Result> GetAsync(Guid exerciseId, int numberSeries)
            => await _context.Results.SingleOrDefaultAsync(x => x.ExerciseId == exerciseId && x.NumberSeries == numberSeries);

        public async Task AddAsync(Result result)
        {
            await _context.Results.AddAsync(result);
            await _context.SaveChangesAsync();
        }

        public async Task<IEnumerable<Result>> BrowseAsync(Guid execriseId)
            => await _context.Results.Where(x => x.ExerciseId == execriseId).ToListAsync();


        public async Task UpdateAsync(Result result)
        {
            _context.Results.Update(result);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteAsync(Result result)
        {
            _context.Results.Remove(result);
            await _context.SaveChangesAsync();
        }
    }
}