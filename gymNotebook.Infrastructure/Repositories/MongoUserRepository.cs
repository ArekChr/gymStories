using gymNotebook.Core.Domain;
using gymNotebook.Core.Repositories;
using MongoDB.Driver;
using MongoDB.Driver.Linq;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace gymNotebook.Infrastructure.Repositories
{
    public class MongoUserRepository : IUserRepository, IMongoRepository
    {
        private readonly IMongoDatabase _database;

        public MongoUserRepository(IMongoDatabase database)
        {
            _database = database;
        }

        public async Task<User> GetAsync(Guid id)
           => await Users.AsQueryable().FirstOrDefaultAsync(x => x.Id == id);

        public async Task<User> GetAsync(string email)
            => await Users.AsQueryable().FirstOrDefaultAsync(x => x.Email == email);

        public async Task AddAsync(User user)
            => await Users.InsertOneAsync(user);

        public async Task DeleteAsync(Guid id)
            => await Users.DeleteOneAsync(x => x.Id == id);

        public async Task<IEnumerable<User>> GetAllAsync()
            => await Users.AsQueryable().ToListAsync();

        public async Task UpdateAsync(User user)
            => await Users.ReplaceOneAsync(x => x.Id == user.Id, user);

        private IMongoCollection<User> Users => _database.GetCollection<User>("Users");
    }
}
