using gymNotebook.Core.Domain;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace gymNotebook.Core.Repositories
{
    public interface IImageRepository : IRepository
    {
        Task<Image> GetAsync(Guid id);

        Task<IEnumerable<Image>> BrowseAsync(Guid userId);

        Task AddAsync(Image image);

        Task DeleteAsync(Image image);

        Task UpdateAsync(Image image);
    }
}
