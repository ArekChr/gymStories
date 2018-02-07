using gymNotebook.Core.Domain;
using gymNotebook.Core.Repositories;
using gymNotebook.Infrastructure.EF;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace gymNotebook.Infrastructure.Repositories
{
    public class SqlTrainingRepository : ITrainingRepository, ISqlRepository
    {
        private readonly GymNotebookContext _context;

        public SqlTrainingRepository(GymNotebookContext context)
        {
            _context = context;
        }

        public async Task<Training> GetAsync(Guid id)
            => await _context.Trainings.SingleOrDefaultAsync(x => x.Id == id);


        public async Task<Training> GetAsync(Guid userId, string name)
            => await _context.Trainings.SingleOrDefaultAsync(x => x.UserId == userId && x.Name == name);

        public async Task AddAsync(Training training)
        {
            await _context.Trainings.AddAsync(training);
            await _context.SaveChangesAsync();
        }

        public async Task<IEnumerable<Training>> BrowseAsync(Guid userId)
            => await _context.Trainings.Where(x => x.UserId == userId).ToListAsync();


        public async Task UpdateAsync(Training training)
        {
            _context.Trainings.Update(training);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteAsync(Training training)
        {
            _context.Trainings.Remove(training);
            await _context.SaveChangesAsync();
        }
    }
}