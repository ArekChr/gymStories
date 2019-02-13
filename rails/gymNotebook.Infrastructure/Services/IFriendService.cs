using gymNotebook.Core.Domain;
using gymNotebook.Infrastructure.DTO;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace gymNotebook.Infrastructure.Services
{
    public interface IFriendService : IService
    {
        Task<Friend> GetAsync(Guid id);

        Task<Friend> GetAsync(Guid userId, Guid friendId);

        Task<IEnumerable<FriendDto>> BrowseAsync(Guid userId);

        Task CreateAsync(Guid userId, Guid friendId, Status status);

        Task DeleteAsync(Guid id);

        Task UpdateAsync(Guid id, Status status);
    }
}
