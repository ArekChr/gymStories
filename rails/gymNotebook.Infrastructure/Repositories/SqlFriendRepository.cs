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
    public class SqlFriendRepository : IFriendRepository, ISqlRepository
    {
        private readonly GymNotebookContext _context;

        public SqlFriendRepository(GymNotebookContext context)
        {
            _context = context;
        }

        public async Task<Friend> GetAsync(Guid id)
            => await _context.Friends.SingleOrDefaultAsync(x => x.Id == id);


        public async Task<Friend> GetAsync(Guid userId, Guid friendId)
            => await _context.Friends.SingleOrDefaultAsync(x => x.UserId == userId && x.FriendId == friendId);

        public async Task AddAsync(Friend friend)
        {
            await _context.Friends.AddAsync(friend);
            await _context.SaveChangesAsync();
        }

        public async Task<IEnumerable<Friend>> BrowseAsync(Guid userId)
            => await _context.Friends.Where(x => x.UserId == userId).ToListAsync();


        public async Task UpdateAsync(Friend friend)
        {
            _context.Friends.Update(friend);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteAsync(Friend friend)
        {
            _context.Friends.Remove(friend);
            await _context.SaveChangesAsync();
        }
    }
}
