using gymNotebook.Core.Domain;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace gymNotebook.Core.Repositories
{
    public interface IFriendRepository : IRepository
    {
        Task<Friend> GetAsync(Guid id);

        Task<Friend> GetAsync(Guid userId, Guid friendId);

        Task<IEnumerable<Friend>> BrowseAsync(Guid userId);

        Task AddAsync(Friend friend); 

        Task DeleteAsync(Friend friend);

        Task UpdateAsync(Friend friend);
    }
}
