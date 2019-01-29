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
    public class SqlFollowRepository : IFollowRepository, ISqlRepository
    {
        private readonly GymNotebookContext _context;

        public SqlFollowRepository(GymNotebookContext context)
        {
            _context = context;
        }

        public async Task<IList<Follow>> BrowseFollowedAsync(Guid userId)
            => await _context.Follows.Where(x => x.Followed == userId).ToListAsync();

        public async Task<IList<Follow>> BrowseFollowersAsync(Guid userId)
            => await _context.Follows.Where(x => x.Follower == userId).ToListAsync();

        public async Task AddAsync(Follow follow)
        {
            await _context.Follows.AddAsync(follow);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteAsync(Follow follow)
        {
            _context.Follows.Remove(follow);
            await _context.SaveChangesAsync();
        }
    }
}
