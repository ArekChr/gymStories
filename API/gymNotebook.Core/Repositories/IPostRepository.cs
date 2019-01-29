using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using gymNotebook.Core.Domain;

namespace gymNotebook.Core.Repositories
{
    public interface IPostRepository : IRepository
    {
        Task<Post> GetAsync(Guid id);

        Task<IEnumerable<Post>> BrowseAsync(Guid userId);

        Task<IEnumerable<Post>> BrowseAsync(IEnumerable<Guid> followed);

        Task AddAsync(Post post);

        Task UpdateAsync(Post post);

        Task DeleteAsync(Post post);
    }
}
