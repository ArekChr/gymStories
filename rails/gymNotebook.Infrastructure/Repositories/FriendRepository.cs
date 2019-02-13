using gymNotebook.Core.Domain;
using gymNotebook.Core.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace gymNotebook.Infrastructure.Repositories
{
    public class FriendRepository : IFriendRepository
    {
        private static readonly ISet<Friend> _friends = new HashSet<Friend>();

        public async Task<IEnumerable<Friend>> BrowseAsync(Guid userId)
            => await Task.FromResult(_friends.Where(x => x.Id == userId).AsEnumerable());

        public async Task<Friend> GetAsync(Guid id)
        {
            throw new NotImplementedException();
        }

        public async Task<Friend> GetAsync(Guid userId, Guid friendId)
            => await Task.FromResult(_friends.SingleOrDefault(x => x.UserId == userId && x.FriendId == friendId));

        public async Task AddAsync(Friend friend)
            => await Task.FromResult(_friends.Add(friend));

        public async Task UpdateAsync(Friend friend)
        {
            await Task.CompletedTask;
        }

        public async Task DeleteAsync(Friend friend)
            => await Task.FromResult(_friends.Remove(friend));
    }
}
