using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using gymNotebook.Core.Domain;
using gymNotebook.Core.Repositories;
using gymNotebook.Infrastructure.EF;
using Microsoft.EntityFrameworkCore;

namespace gymNotebook.Infrastructure.Repositories
{
    public class SqlProfileRepository : IProfileRepository, ISqlRepository
    {
        private readonly GymNotebookContext _context;

        public SqlProfileRepository(GymNotebookContext context)
        {
            _context = context;
        }

        public async Task<Profile> GetAsync(Guid id)
            => await _context.Profiles.FirstOrDefaultAsync(x => x.Id == id);

        public async Task<IEnumerable<Profile>> BrowseAsync()
            => await _context.Profiles.ToListAsync();

        public async Task<IEnumerable<Profile>> SearchAsync(string[] paramStrings)
        {
            return await _context.Profiles.Where(x => 
                paramStrings.Contains(x.FirstName) || paramStrings.Contains(x.LastName)).ToListAsync();
        }

        public async Task AddAsync(Profile profile)
        {
            await _context.Profiles.AddAsync(profile);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteAsync(Profile profile)
        {
            _context.Profiles.Remove(profile);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateAsync(Profile profile)
        {
            _context.Profiles.Update(profile);
            await _context.SaveChangesAsync();
        }
    }
}
