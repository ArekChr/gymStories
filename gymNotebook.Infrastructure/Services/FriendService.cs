using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using gymNotebook.Core.Domain;
using gymNotebook.Core.Repositories;

namespace gymNotebook.Infrastructure.Services
{
    public class FriendService : IFriendService
    {
        private readonly IFriendRepository _repo;

        public FriendService(IFriendRepository repo)
        {
            _repo = repo;
        }

        public async Task<Friend> GetAsync(Guid id)
        {
            var friend = await _repo.GetAsync(id);

            return friend;
        }

        public async Task<Friend> GetAsync(Guid userId, Guid friendId)
        {
            var friend = await _repo.GetAsync(userId, friendId);

            return friend;
        }

        public async Task<IEnumerable<Friend>> BrowseAsync(Guid userId)
        {
            var friends = await _repo.BrowseAsync(userId);

            return friends;
        }

        public async Task CreateAsync(Guid userId, Guid friendId, Status status)
        {
            var friend = await _repo.GetAsync(userId, friendId);
            if(friend != null)
            {
                throw new Exception($"Friend with id: '{friendId}' already exists.");
            }
            friend = new Friend(userId, friendId, Status.Sent);
            await _repo.AddAsync(friend);
        }

        public async Task UpdateAsync(Guid id, Status status)
        {
            var friend = await _repo.GetAsync(id);
            if(friend == null)
            {
                throw new Exception($"Friend with id: '{id}' does not exists.");
            }
            friend.AcceptFriend(Status.Friends);
            await _repo.UpdateAsync(friend);
        }

        public async Task DeleteAsync(Guid id)
        {
            var friend = await _repo.GetAsync(id);
            if (friend == null)
            {
                throw new Exception($"Exercise with id: '{id}' does not exists");
            }
            await _repo.DeleteAsync(friend);
        }
    }
}
