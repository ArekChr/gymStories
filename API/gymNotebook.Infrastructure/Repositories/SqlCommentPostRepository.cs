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
    public class SqlCommentPostRepository : ICommentPostRepository, ISqlRepository
    {
        private readonly GymNotebookContext _context;

        public SqlCommentPostRepository(GymNotebookContext context)
        {
            _context = context;
        }

        public async Task<IList<CommentPostRels>> BrowseAsync(Guid postId)
            => await _context.CommentPostRels
            .Include(x => x.Comment)
            .ThenInclude(x => x.User)
            .ThenInclude(x => x.Profile)
            .Where(x => x.PostId == postId)
            .ToListAsync();

        public async Task<CommentPostRels> CreateAsync(CommentPostRels commentPostRels)
        {
            await _context.CommentPostRels.AddAsync(commentPostRels);
            await _context.Comments.AddAsync(commentPostRels.Comment);
            await _context.SaveChangesAsync();

            return await _context.CommentPostRels
                .Include(x => x.Comment)
                .ThenInclude(x => x.User)
                .ThenInclude(x => x.Profile)
                .SingleOrDefaultAsync(x => x.CommentId == commentPostRels.CommentId);
        }
    }
}
