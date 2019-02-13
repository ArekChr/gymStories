using gymNotebook.Core.Domain;
using gymNotebook.Core.Repositories;
using MongoDB.Driver;
using MongoDB.Driver.Linq;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace gymNotebook.Infrastructure.Repositories
{
    public class MongoTrainingRepository : ITrainingRepository, IMongoRepository
    {
        private readonly IMongoDatabase _database;

        public MongoTrainingRepository(IMongoDatabase database)
        {
            _database = database;
        }

        private IMongoCollection<Training> Trainings 
            => _database.GetCollection<Training>("Trainings");

        public async Task<Training> GetAsync(Guid id)
            => await Trainings.AsQueryable().FirstOrDefaultAsync(x => x.Id == id);

        public async Task<Training> GetAsync(Guid userId, string name)
            => await Trainings.AsQueryable().FirstOrDefaultAsync(x => x.UserId == userId && x.Name == name);

        public async Task AddAsync(Training training)
            => await Trainings.InsertOneAsync(training);

        public async Task DeleteAsync(Training training)
            => await Trainings.DeleteOneAsync(x => x.Id == training.Id);

        public async Task<IEnumerable<Training>> BrowseAsync(Guid userId)
            => await Trainings.AsQueryable().Where(x => x.UserId == userId).ToListAsync();

        public async Task UpdateAsync(Training training)
            => await Trainings.ReplaceOneAsync(x => x.Id == training.Id, training);
    }
}
