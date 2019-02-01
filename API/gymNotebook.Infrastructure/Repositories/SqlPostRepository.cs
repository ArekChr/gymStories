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
    public class SqlPostRepository : IPostRepository, ISqlRepository
    {
        private readonly GymNotebookContext _context;

        public SqlPostRepository(GymNotebookContext context)
        {
            _context = context;
        }

        public async Task<Post> GetAsync(Guid id, Guid userId)
            => await _context.Posts
            .SingleOrDefaultAsync(x => x.Id == id && x.UserId == userId);

        public async Task<IList<Post>> BrowseHomeAsync(IList<Guid> followed, DateTime startDate, int quantity)
            => await _context.Posts
            .Where(x => followed.Contains(x.UserId))
            .OrderByDescending(x => x.CreatedAt)
            .Where(x => x.CreatedAt > startDate)
            .Take(quantity)
            .Include(x => x.Image)
            .Include(x => x.CommentPostRels)
            .ToListAsync();

        public async Task<IList<Post>> BrowseAsync(IList<Guid> followed)
            => await _context.Posts
            .Where(x => followed.Contains(x.UserId))
            .ToListAsync();

        public async Task AddAsync(Post post)
        {
            await _context.Posts.AddAsync(post);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateAsync(Post post)
        {
            _context.Posts.Update(post);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteAsync(Post post)
        {
            _context.Posts.Remove(post);
            await _context.SaveChangesAsync();
        }
    }
}
