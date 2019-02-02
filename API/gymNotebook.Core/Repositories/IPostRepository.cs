using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using gymNotebook.Core.Domain;

namespace gymNotebook.Core.Repositories
{
    public interface IPostRepository : IRepository
    {
        Task<Post> GetAsync(Guid id, Guid userId);

        Task<IList<Post>> BrowseHomeAsync(IList<Guid> followed, DateTime? startDate, int quantity);

        Task<IList<Post>> BrowseAsync(IList<Guid> followed);

        Task AddAsync(Post post);

        Task UpdateAsync(Post post);

        Task DeleteAsync(Post post);
    }
}
