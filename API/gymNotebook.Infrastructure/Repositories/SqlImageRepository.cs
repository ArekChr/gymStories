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
    public class SqlImageRepository : IImageRepository, ISqlRepository
    {
        private readonly GymNotebookContext _context;

        public SqlImageRepository(GymNotebookContext context)
        {
            _context = context;
        }

        public async Task AddAsync(Image image)
        {
            await _context.Images.AddAsync(image);
            await _context.SaveChangesAsync();
        }
        public async Task<IEnumerable<Image>> BrowseAsync(Guid userId)
            => await _context.Images.Where(x => x.UserId == userId).ToListAsync();

        public async Task<Image> GetAsync(Guid id)
            => await _context.Images.SingleOrDefaultAsync(x => x.Id == id);

        public async Task UpdateAsync(Image image)
        {
            _context.Images.Update(image);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteAsync(Image image)
        {
            _context.Images.Remove(image);
            await _context.SaveChangesAsync();
        }
    }
}
