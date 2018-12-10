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
    class SqlProgressRepository : IProgressRepository, ISqlRepository
    {
        private readonly GymNotebookContext _context;

        public SqlProgressRepository(GymNotebookContext context)
        {
            _context = context;
        }

        public async Task<Progress> GetAsync(Guid id)
            => await _context.Progress.SingleOrDefaultAsync(x => x.Id == id);

        public async Task AddAsync(Progress progress)
        {
            await _context.Progress.AddAsync(progress);
            await _context.SaveChangesAsync();
        }

        public async Task<IEnumerable<Progress>> BrowseAsync(Guid userId)
            => await _context.Progress.Where(x => x.UserId == userId).ToListAsync();


        public async Task UpdateAsync(Progress progress)
        {
            _context.Progress.Update(progress);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteAsync(Progress progress)
        {
            _context.Progress.Remove(progress);
            await _context.SaveChangesAsync();
        }
    }
}
