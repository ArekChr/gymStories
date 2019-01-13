using gymNotebook.Core.Repositories;
using System;
using System.Collections.Generic;
using gymNotebook.Core.Domain;
using System.Threading.Tasks;
using System.Linq;

namespace gymNotebook.Infrastructure.Repositories
{
    public class UserRepository : IUserRepository
    {
        private static readonly ISet<User> _users = new HashSet<User>
        {
            new User("user1@gmail.com","secret11","salt123"),
            new User("user2@gmail.com","secret11","salt123")
        };

        public async Task AddAsync(User user)
        {
            _users.Add(user);
            await Task.CompletedTask;
        }

        public async Task<User> GetAsync(Guid id)
            => await Task.FromResult(_users.SingleOrDefault(x => x.Id == id));

        public async Task<User> GetAsync(string email)
            => await Task.FromResult(_users.SingleOrDefault(x => x.Email.ToLowerInvariant() == email.ToLowerInvariant()));

        public async Task<IEnumerable<User>> GetAllAsync()
        {
            var users = _users.AsEnumerable();

            return await Task.FromResult(users);
        }

        public async Task DeleteAsync(Guid id)
        {
            var user = await GetAsync(id);
            _users.Remove(user);
            await Task.CompletedTask;
        }
        
        public async Task UpdateAsync(User user)
        {
            await Task.CompletedTask;
        }
    }
}
