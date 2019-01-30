using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using gymNotebook.Core.Domain;

namespace gymNotebook.Core.Repositories
{
    public interface IPostRepository : IRepository
    {
        Task<Post> GetAsync(Guid id);

        Task<IList<Post>> BrowseAsync(Guid userId, int quantity);

        Task<IList<Post>> BrowseAsync(IList<Guid> followed);

        Task AddAsync(Post post);

        Task UpdateAsync(Post post);

        Task DeleteAsync(Post post);
    }
}
